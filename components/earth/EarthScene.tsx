"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import EarthGlobe from "./EarthGlobe";
import { cameraZ, earthState, exposure } from "./progress";

/** Drives camera distance and exposure from the shared scroll progress. */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const size = useThree((s) => s.size);

  useEffect(() => {
    earthState.aspect = size.width / size.height;
  }, [size]);

  useFrame(() => {
    const p = earthState.progress;
    camera.position.set(0, 0, cameraZ(p));
    camera.lookAt(0, 0, 0);
    gl.toneMappingExposure = exposure(p);
  });
  return null;
}

/** Pauses rendering while the sequence is off-screen. */
function FrameloopGate({ active }: { active: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop);
  useEffect(() => {
    setFrameloop(active ? "always" : "never");
  }, [active, setFrameloop]);
  return null;
}

export default function EarthScene({
  mobile,
  active,
  onReady,
}: {
  mobile: boolean;
  active: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      camera={{ fov: 38, near: 0.01, far: 120, position: [0, 0, 4.8] }}
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: !mobile,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: "high-performance",
      }}
      onCreated={onReady}
    >
      <FrameloopGate active={active} />
      <CameraRig />
      <ambientLight intensity={0.11} />
      <directionalLight position={[-4.5, 1.4, 2.6]} intensity={2.4} />
      <Stars
        radius={70}
        depth={25}
        count={mobile ? 650 : 1500}
        factor={1.6}
        saturation={0}
        fade
        speed={0}
      />
      <Suspense fallback={null}>
        <EarthGlobe mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
