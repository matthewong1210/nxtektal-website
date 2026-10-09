// @vitest-environment jsdom

import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HeroBackgroundVideo from "../HeroBackgroundVideo";
import ProductHero from "../ProductHero";

let container: HTMLDivElement;
let root: Root;
let width: number;
let reducedMotion: boolean;
const mediaQueries = new Map<string, MediaQueryList>();

function matches(query: string) {
  if (query === "(max-width: 760px)") return width <= 760;
  if (query === "(prefers-reduced-motion: reduce)") return reducedMotion;
  throw new Error(`Unexpected media query: ${query}`);
}

async function setPreferences(nextWidth: number, reduced = false) {
  await act(async () => {
    const previous = new Map([...mediaQueries].map(([query, media]) => [query, media.matches]));
    width = nextWidth;
    reducedMotion = reduced;
    for (const [query, media] of mediaQueries) {
      if (media.matches !== previous.get(query)) media.dispatchEvent(new Event("change"));
    }
  });
}

async function render(content: ReactNode = <HeroBackgroundVideo />) {
  await act(async () => root.render(content));
}

function getVideo() {
  const video = container.querySelector("video");
  expect(video, "hero should mount a video when motion is allowed").not.toBeNull();
  return video!;
}

function sources(video: HTMLVideoElement) {
  return [...video.querySelectorAll("source")].map((source) => ({
    src: source.getAttribute("src"),
    type: source.type,
  }));
}

function getPlayButton() {
  const button = [...container.querySelectorAll("button")].find(
    (item) => (item.getAttribute("aria-label") || item.textContent?.trim()) === "Play background video",
  );
  expect(button, "blocked autoplay should expose a named retry button").toBeDefined();
  return button!;
}

beforeEach(() => {
  width = 1440;
  reducedMotion = false;
  mediaQueries.clear();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", (query: string) => {
    if (!mediaQueries.has(query)) {
      const events = new EventTarget();
      mediaQueries.set(query, {
        get matches() { return matches(query); },
        media: query,
        onchange: null,
        addEventListener: events.addEventListener.bind(events),
        removeEventListener: events.removeEventListener.bind(events),
        dispatchEvent: events.dispatchEvent.bind(events),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      });
    }
    return mediaQueries.get(query)!;
  });
  // jsdom has no media engine: these stubs exercise the component's playback
  // requests and event handling, without claiming that a file was decoded.
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("HeroBackgroundVideo", () => {
  it.each([390, 760])("uses only the mobile MP4 at %ipx with inline muted autoplay", async (mobileWidth) => {
    await setPreferences(mobileWidth);
    await render();

    const video = getVideo();
    expect(container.querySelectorAll("video")).toHaveLength(1);
    expect(sources(video)).toEqual([
      { src: "/visuals/phase2/hero/hero-loop-mobile.mp4", type: "video/mp4" },
    ]);
    expect(video.muted).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.controls).toBe(false);
    expect(video.classList.contains("is-live")).toBe(false);
    expect(vi.mocked(video.play).mock.contexts).toContain(video);
  });

  it("retains the desktop WebM and MP4 sources above the breakpoint", async () => {
    await setPreferences(761);
    await render();

    expect(sources(getVideo())).toEqual([
      { src: "/visuals/phase2/hero/hero-loop.webm", type: "video/webm" },
      { src: "/visuals/phase2/hero/hero-loop.mp4", type: "video/mp4" },
    ]);
  });

  it("mounts no video or retry control when reduced motion is requested", async () => {
    await setPreferences(390, true);
    await render();
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("button")).toBeNull();

    await setPreferences(1440, true);
    expect(container.querySelector("video")).toBeNull();
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it("replaces and restarts the video when crossing the mobile breakpoint", async () => {
    await render();
    const desktop = getVideo();
    await act(async () => desktop.dispatchEvent(new Event("playing")));
    expect(desktop.classList.contains("is-live")).toBe(true);

    await setPreferences(390);
    const mobile = getVideo();
    expect(mobile).not.toBe(desktop);
    expect(desktop.isConnected).toBe(false);
    expect(mobile.classList.contains("is-live")).toBe(false);
    expect(sources(mobile)).toEqual([
      { src: "/visuals/phase2/hero/hero-loop-mobile.mp4", type: "video/mp4" },
    ]);
    expect(vi.mocked(mobile.play).mock.contexts).toContain(mobile);

    await setPreferences(1440);
    const restored = getVideo();
    expect(restored).not.toBe(mobile);
    expect(mobile.isConnected).toBe(false);
    expect(sources(restored)).toEqual([
      { src: "/visuals/phase2/hero/hero-loop.webm", type: "video/webm" },
      { src: "/visuals/phase2/hero/hero-loop.mp4", type: "video/mp4" },
    ]);
    expect(vi.mocked(restored.play).mock.contexts).toContain(restored);
  });

  it("exposes an accessible retry button within ProductHero after autoplay is blocked", async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new DOMException("Autoplay blocked", "NotAllowedError"));
    await render(<ProductHero copy={<h1>Facility intelligence</h1>} />);

    const button = getPlayButton();
    expect(button.disabled).toBe(false);
    expect(button.closest('[aria-hidden="true"], [hidden]')).toBeNull();
    expect(getComputedStyle(button).display).not.toBe("none");
    expect(getComputedStyle(button).visibility).not.toBe("hidden");
    expect(getVideo().classList.contains("is-live")).toBe(false);
    expect(container.querySelector("picture img")).not.toBeNull();
  });

  it("retries on the mobile play button and reveals the video only after playing", async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new DOMException("Autoplay blocked", "NotAllowedError"));
    await setPreferences(390);
    await render();
    const video = getVideo();
    const button = getPlayButton();
    vi.mocked(video.play).mockClear();

    await act(async () => button.click());
    expect(vi.mocked(video.play).mock.contexts).toContain(video);
    expect(video.classList.contains("is-live")).toBe(false);

    await act(async () => video.dispatchEvent(new Event("playing")));
    expect(video.classList.contains("is-live")).toBe(true);
    expect(container.querySelector("button")).toBeNull();
  });

  it("returns to the poster on pause and requests playback when the page becomes visible", async () => {
    await render();
    const video = getVideo();
    await act(async () => video.dispatchEvent(new Event("playing")));
    expect(video.classList.contains("is-live")).toBe(true);

    await act(async () => video.dispatchEvent(new Event("pause")));
    expect(video.classList.contains("is-live")).toBe(false);
    vi.mocked(video.play).mockClear();
    await act(async () => document.dispatchEvent(new Event("visibilitychange")));
    expect(vi.mocked(video.play).mock.contexts).toContain(video);

    await act(async () => video.dispatchEvent(new Event("playing")));
    expect(video.classList.contains("is-live")).toBe(true);
  });
});
