import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { hasMasterFrame, heroMasterFrame } from "../visualAssets";

const publicPath = (p: string) => join(process.cwd(), "public", p);

describe("hero background loop (Phase 2G)", () => {
  it("keeps the approved master frame active as the poster and fallback", () => {
    expect(hasMasterFrame()).toBe(true);
    expect(heroMasterFrame.loop?.poster).toBe(heroMasterFrame.desktop?.webp);
  });

  it("registers WebM plus MP4 fallback from the phase2 hero directory", () => {
    const loop = heroMasterFrame.loop;
    expect(loop?.webm).toMatch(/^\/visuals\/phase2\/hero\/[\w-]+\.webm$/);
    expect(loop?.mp4).toMatch(/^\/visuals\/phase2\/hero\/[\w-]+\.mp4$/);
  });

  it("ships every registered loop file — the registry never points at media that does not exist", () => {
    const loop = heroMasterFrame.loop;
    expect(loop).not.toBeNull();
    if (!loop) return;
    for (const p of [loop.webm, loop.mp4, loop.poster]) {
      expect(existsSync(publicPath(p)), `missing public asset: ${p}`).toBe(true);
    }
  });
});
