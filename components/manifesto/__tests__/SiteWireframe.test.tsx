// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SiteWireframe from "../SiteWireframe";

let container: HTMLDivElement;
let root: Root;
let reducedMotion = false;
let frames = 0;
let draws = 0;

/** A 2D context stand-in: every method is a no-op that counts stroke/fill calls; every property assignment is accepted. */
function fakeContext() {
  const target: Record<string, unknown> = {};
  return new Proxy(target, {
    get: (_t, key) => {
      if (key === "stroke" || key === "fill") return () => { draws += 1; };
      return () => undefined;
    },
    set: () => true,
  });
}

beforeEach(() => {
  reducedMotion = false;
  frames = 0;
  draws = 0;
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() { return query.includes("reduced-motion") ? reducedMotion : false; },
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }));
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => { frames += 1; if (frames <= 3) setTimeout(() => cb(frames * 16), 0); return frames; });
  vi.stubGlobal("cancelAnimationFrame", () => undefined);
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => fakeContext() as unknown as CanvasRenderingContext2D);
  container = document.createElement("div");
  const section = document.createElement("section");
  section.append(container);
  document.body.append(section);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.parentElement?.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("SiteWireframe", () => {
  it("renders a labelled decorative canvas and draws frames when motion is allowed", async () => {
    await act(async () => root.render(<SiteWireframe />));
    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas?.getAttribute("role")).toBe("img");
    expect(canvas?.getAttribute("aria-label")).toContain("Decorative");
    await act(async () => { await new Promise((r) => setTimeout(r, 30)); });
    expect(frames).toBeGreaterThan(0);
    expect(draws).toBeGreaterThan(0);
  });

  it("draws one still frame and requests no animation under reduced motion", async () => {
    reducedMotion = true;
    await act(async () => root.render(<SiteWireframe />));
    await act(async () => { await new Promise((r) => setTimeout(r, 30)); });
    expect(frames).toBe(0);
    expect(draws).toBeGreaterThan(0);
  });

  it("renders without a 2D context (no drawing, no error)", async () => {
    vi.mocked(HTMLCanvasElement.prototype.getContext).mockImplementation(() => null);
    await act(async () => root.render(<SiteWireframe />));
    expect(container.querySelector("canvas")).not.toBeNull();
    expect(draws).toBe(0);
  });
});
