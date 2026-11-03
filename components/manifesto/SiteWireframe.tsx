"use client";

import { useEffect, useRef } from "react";

/**
 * The first screen's interactive visual: an abstract wireframe of a driving
 * range drawn on a canvas — a terrain grid, the collection zones as rings
 * from the tee line, Insite's scan sweeping across the outfield and lighting
 * the nodes it passes, and three robots moving along their own paths. The
 * scene drifts slowly on its own and tilts toward the pointer while it is
 * over the hero; it pauses off-screen and when the tab is hidden, and under
 * prefers-reduced-motion it draws one still frame and listens to nothing.
 *
 * It is decorative and makes no claim: no figures, no labels, no site. All
 * geometry is deterministic (no randomness), so every visitor sees the same
 * scene. Plain 2D canvas with a small perspective projection — no library.
 */

type Vec = { x: number; y: number; z: number };

const COLS = 26;
const ROWS = 18;
const X_MIN = -1;
const X_MAX = 1;
const Z_MIN = 0;
const Z_MAX = 2.2;
const CENTER: Vec = { x: 0, y: 0, z: 1.05 };
const EYE: Vec = { x: 0, y: 1.3, z: -1.25 };
const TARGET: Vec = { x: 0, y: -0.08, z: 1.0 };
const FOCAL = 1.04;
const ZONES = [0.55, 1.0, 1.45, 1.9];
const TRAIL = 70;

const LIME = "154, 248, 18";
const BLUE = "91, 157, 255";
const WHITE = "245, 247, 247";
const AMBER = "224, 168, 58";

/** Gentle, deterministic undulation of the outfield. */
function terrain(x: number, z: number): number {
  return 0.07 * (Math.sin(3.1 * x + 1.2) * Math.cos(2.3 * z) + 0.5 * Math.sin(5.2 * z + 1.7 * x));
}

function norm(v: Vec): Vec {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}
function cross(a: Vec, b: Vec): Vec {
  return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
}
function dot(a: Vec, b: Vec): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

const F = norm({ x: TARGET.x - EYE.x, y: TARGET.y - EYE.y, z: TARGET.z - EYE.z });
const R = norm(cross({ x: 0, y: 1, z: 0 }, F));
const U = cross(F, R);

/** The three robots' paths: closed, smooth, inside the outfield. */
function robotAt(i: number, t: number): Vec {
  const x = i === 0 ? 0.55 * Math.sin(t * 0.21 + 0.3) : i === 1 ? -0.6 * Math.sin(t * 0.17 + 2.0) : 0.3 * Math.sin(t * 0.27 + 4.1);
  const z = i === 0 ? 1.25 + 0.75 * Math.sin(t * 0.13 + 1.1) : i === 1 ? 1.0 + 0.6 * Math.cos(t * 0.11 + 0.4) : 1.6 + 0.45 * Math.sin(t * 0.19 + 2.6);
  return { x, y: terrain(x, z) + 0.02, z };
}

export default function SiteWireframe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const section = canvas.closest("section") ?? canvas.parentElement ?? canvas;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let w = 1;
    let h = 1;
    let dpr = 1;
    let yaw = 0;
    let pitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let pointerIn = false;
    let time = 0;
    let last = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const trails: Vec[][] = [[], [], []];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    /** Rotate about the scene centre (pointer tilt + idle drift), then project through the fixed camera. */
    const project = (p: Vec): [number, number, number] | null => {
      const dx = p.x - CENTER.x;
      const dy = p.y - CENTER.y;
      const dz = p.z - CENTER.z;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const rx = dx * cy + dz * sy;
      let rz = -dx * sy + dz * cy;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const ry = dy * cp - rz * sp;
      rz = dy * sp + rz * cp;
      const e = { x: rx + CENTER.x - EYE.x, y: ry + CENTER.y - EYE.y, z: rz + CENTER.z - EYE.z };
      const zc = dot(e, F);
      if (zc <= 0.08) return null;
      const s = (FOCAL * w) / zc;
      return [w / 2 + dot(e, R) * s, h * 0.54 - dot(e, U) * s, zc];
    };

    const polyline = (points: Vec[], style: string, width: number) => {
      ctx.beginPath();
      let open = false;
      for (const p of points) {
        const q = project(p);
        if (!q) {
          open = false;
          continue;
        }
        if (open) ctx.lineTo(q[0], q[1]);
        else ctx.moveTo(q[0], q[1]);
        open = true;
      }
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // terrain grid, fainter with distance
      for (let r = 0; r <= ROWS; r++) {
        const z = Z_MIN + ((Z_MAX - Z_MIN) * r) / ROWS;
        const pts: Vec[] = [];
        for (let c = 0; c <= COLS; c++) {
          const x = X_MIN + ((X_MAX - X_MIN) * c) / COLS;
          pts.push({ x, y: terrain(x, z), z });
        }
        const depth = 1 - (r / ROWS) * 0.55;
        polyline(pts, `rgba(${WHITE}, ${0.16 * depth})`, 1);
      }
      for (let c = 0; c <= COLS; c++) {
        const x = X_MIN + ((X_MAX - X_MIN) * c) / COLS;
        const pts: Vec[] = [];
        for (let r = 0; r <= ROWS; r++) {
          const z = Z_MIN + ((Z_MAX - Z_MIN) * r) / ROWS;
          pts.push({ x, y: terrain(x, z), z });
        }
        polyline(pts, `rgba(${WHITE}, 0.11)`, 1);
      }

      // collection zones: rings from the tee line, clipped to the outfield
      for (const radius of ZONES) {
        const pts: Vec[] = [];
        for (let i = 0; i <= 72; i++) {
          const a = -Math.PI / 2 + (Math.PI * i) / 72;
          const x = radius * Math.sin(a);
          const z = radius * Math.cos(a);
          // a point outside the outfield breaks the path (polyline treats a null projection as a break)
          pts.push(x < X_MIN || x > X_MAX || z > Z_MAX ? { x: 0, y: 0, z: -99 } : { x, y: terrain(x, z) + 0.012, z });
        }
        polyline(pts, `rgba(${BLUE}, 0.42)`, 1);
      }

      // the scan: a ray from the tee sweeping the outfield, with a short afterglow
      const sweep = Math.sin(t * 0.33) * 0.95;
      const ray = (a: number, alpha: number, width: number) => {
        const sx = Math.sin(a);
        const sz = Math.cos(a);
        const tz = Z_MAX / sz;
        const tx = sx === 0 ? Infinity : (sx > 0 ? X_MAX : X_MIN) / sx;
        const tmax = Math.min(tz, tx);
        const pts: Vec[] = [];
        for (let i = 0; i <= 28; i++) {
          const d = (tmax * i) / 28;
          const x = sx * d;
          const z = sz * d;
          pts.push({ x, y: terrain(x, z) + 0.015, z });
        }
        polyline(pts, `rgba(${LIME}, ${alpha})`, width);
      };
      for (let k = 6; k >= 1; k--) ray(sweep - k * 0.035 * Math.sign(Math.cos(t * 0.33) || 1), 0.03 + (0.16 * (7 - k)) / 7, 1);
      ray(sweep, 0.85, 1.6);

      // nodes on the grid light up as the scan passes
      for (let r = 2; r < ROWS; r += 2) {
        const z = Z_MIN + ((Z_MAX - Z_MIN) * r) / ROWS;
        for (let c = 1; c < COLS; c += 2) {
          const x = X_MIN + ((X_MAX - X_MIN) * c) / COLS;
          const q = project({ x, y: terrain(x, z) + 0.01, z });
          if (!q) continue;
          const ang = Math.atan2(x, z);
          const glow = Math.max(0, 1 - Math.abs(ang - sweep) / 0.14);
          ctx.beginPath();
          ctx.arc(q[0], q[1], 1.2 + glow * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${LIME}, ${0.18 + glow * 0.8})`;
          ctx.fill();
        }
      }

      // the tee line / dispenser point
      const tee = project({ x: 0, y: terrain(0, 0) + 0.02, z: 0.02 });
      if (tee) {
        ctx.beginPath();
        ctx.arc(tee[0], tee[1], 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${AMBER}, 0.9)`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // robots: a trail and a dot each
      const colors = [LIME, WHITE, BLUE];
      for (let i = 0; i < 3; i++) {
        const p = robotAt(i, t);
        const trail = trails[i];
        if (!reduced.matches) {
          trail.push(p);
          if (trail.length > TRAIL) trail.shift();
        }
        if (trail.length > 1) polyline(trail, `rgba(${colors[i]}, 0.35)`, 1);
        const q = project(p);
        if (!q) continue;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[i]}, 0.12)`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(q[0], q[1], 3.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[i]}, 0.95)`;
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      time += dt;
      if (!pointerIn) {
        targetYaw = Math.sin(time * 0.22) * 0.09;
        targetPitch = Math.sin(time * 0.17) * 0.035;
      }
      yaw += (targetYaw - yaw) * 0.05;
      pitch += (targetPitch - pitch) * 0.05;
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced.matches || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointerIn = px >= -1 && px <= 1 && py >= -1 && py <= 1;
      if (pointerIn) {
        targetYaw = px * 0.3;
        targetPitch = py * 0.16;
      }
    };
    const onLeave = () => {
      pointerIn = false;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReduced = () => {
      if (reduced.matches) {
        stop();
        draw(time);
      } else start();
    };

    resize();
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
      resize();
      if (!running) draw(time);
    }) : null;
    resizeObserver?.observe(canvas);
    const intersection = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }) : null;
    intersection?.observe(canvas);

    if (reduced.matches) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave);
      if (!intersection) start();
    }
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onReduced);

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      resizeObserver?.disconnect();
      intersection?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="wire-canvas"
      role="img"
      aria-label="Abstract wireframe of a driving range: a terrain grid, collection zones ringed from the tee line, Insite’s scan sweeping the outfield, and three robots moving along their paths. Decorative."
    />
  );
}
