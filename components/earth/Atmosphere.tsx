"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { atmosphereStrength, earthState } from "./progress";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.5);
    gl_FragColor = vec4(uColor, 1.0) * rim * uStrength;
  }
`;

/**
 * Atmospheric limb glow: a slightly larger back-side sphere with a
 * view-space Fresnel falloff, additively blended so it only reads at the
 * planet's edge. Natural blue with the faintest teal cast — no green outline.
 */
export default function Atmosphere() {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#4d7fd6") },
      uStrength: { value: 1.0 },
    }),
    []
  );

  useFrame(() => {
    if (material.current) {
      material.current.uniforms.uStrength.value = atmosphereStrength(
        earthState.progress
      );
    }
  });

  return (
    <mesh scale={1.045}>
      <sphereGeometry args={[1, 48, 48]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
