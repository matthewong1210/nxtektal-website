"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Atmosphere from "./Atmosphere";
import {
  cloudOpacity,
  earthOffsetX,
  earthRotationY,
  earthState,
} from "./progress";

/**
 * The planet: day texture, normal + specular detail, an independent
 * transparent cloud shell slightly above the surface, restrained night-side
 * city lights, and the atmospheric limb glow. All natural colour — the brand
 * lime never touches the planet itself.
 */
export default function EarthGlobe({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const earth = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);
  const cloudMaterial = useRef<THREE.MeshLambertMaterial>(null);

  const res = mobile ? "1024" : "2048";
  const [dayMap, normalMap, specularMap, lightsMap, cloudsMap] = useTexture([
    `/earth/earth_atmos_${res}.jpg`,
    `/earth/earth_normal_${res}.jpg`,
    `/earth/earth_specular_${res}.jpg`,
    `/earth/earth_lights_${res}.png`,
    "/earth/earth_clouds_1024.png",
  ]);

  dayMap.colorSpace = THREE.SRGBColorSpace;
  lightsMap.colorSpace = THREE.SRGBColorSpace;
  dayMap.anisotropy = mobile ? 2 : 8;

  const segments = mobile ? 64 : 96;

  useFrame(({ clock }) => {
    const p = earthState.progress;
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.x = earthOffsetX(p, earthState.aspect);
    }
    if (earth.current) {
      // Idle spin only matters while the camera is far out; the
      // progress-driven term keeps the shot fully scroll-reversible.
      const idle = t * 0.012 * Math.max(0, 1 - p / 0.14);
      earth.current.rotation.y = earthRotationY(p) + idle;
    }
    if (clouds.current && earth.current) {
      clouds.current.rotation.y = earth.current.rotation.y + t * 0.006;
    }
    if (cloudMaterial.current) {
      cloudMaterial.current.opacity = cloudOpacity(p);
    }
  });

  return (
    <group ref={group} rotation={[0, 0, -0.2]}>
      <mesh ref={earth}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshPhongMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          specularMap={specularMap}
          specular={new THREE.Color("#2a3540")}
          shininess={14}
          emissiveMap={lightsMap}
          emissive={new THREE.Color("#cfa76a")}
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh ref={clouds}>
        <sphereGeometry args={[1.008, segments, segments]} />
        <meshLambertMaterial
          ref={cloudMaterial}
          map={cloudsMap}
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>
      <Atmosphere />
    </group>
  );
}
