'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';

function Scene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.PointLight>(null);

  const shapes = useMemo(() => {
    const geoA = new THREE.IcosahedronGeometry(1.05, 0);
    const geoB = new THREE.TorusKnotGeometry(0.75, 0.22, 120, 12);
    const geoC = new THREE.BoxGeometry(1.2, 1.2, 1.2, 3, 3, 3);

    const matA = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#67E8F9'),
      metalness: 0.55,
      roughness: 0.25,
      emissive: new THREE.Color('#0B1020'),
      emissiveIntensity: 0.7,
    });
    const matB = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E8EEFF'),
      metalness: 0.75,
      roughness: 0.18,
    });
    const matC = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5EEAD4'),
      metalness: 0.5,
      roughness: 0.28,
      transparent: true,
      opacity: 0.95,
    });

    return {
      geoA,
      geoB,
      geoC,
      matA,
      matB,
      matC,
    };
  }, []);

  // Scroll-driven "3D-ish" animation using a frame sequence flipbook.
  // Expected public paths:
  //   /public/assets/frames/frame-01.png ... frame-80.png
  const FRAME_BASE = '/assets/frames';

  // Performance tuning:
  // We load a subset of frames to keep initial texture upload fast.
  // - FRAME_STEP=1 loads all frames
  // - FRAME_STEP=2 ~40 frames, FRAME_STEP=4 ~20 frames
  const FRAME_START = 1;
  const FRAME_END = 80;
  const FRAME_STEP = 4;

  const frameUrls = useMemo(() => {
    const urls: string[] = [];
    for (let n = FRAME_START; n <= FRAME_END; n += FRAME_STEP) {
      const nn = String(n).padStart(2, '0');
      urls.push(`${FRAME_BASE}/frame-${nn}.png`);
    }
    return urls;
  }, []);

  const frameTexturesRef = useRef<THREE.Texture[]>([]);
  const frameMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const prevFrameIdxRef = useRef<number>(-1);
  const [frameAspect, setFrameAspect] = useState<number>(16 / 9);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loader = new THREE.TextureLoader();
    const loadPromises = frameUrls.map(
      (url) =>
        new Promise<THREE.Texture | null>((resolve) => {
          loader.load(
            url,
            (tex) => resolve(tex),
            undefined,
            () => resolve(null)
          );
        }),
    );

    Promise.all(loadPromises).then((textures) => {
      if (cancelled) return;
      const valid = textures.filter(Boolean) as THREE.Texture[];
      frameTexturesRef.current = valid;
      if (valid[0]?.image && typeof (valid[0].image as any).naturalWidth === 'number') {
        const img = valid[0].image as HTMLImageElement;
        const w = img.naturalWidth || img.width || 1;
        const h = img.naturalHeight || img.height || 1;
        setFrameAspect(w / h);
      }
      setFramesReady(valid.length > 0);
    });

    return () => {
      cancelled = true;
    };
  }, [frameUrls]);

  useFrame((state) => {
    const p = scrollYProgress.get();
    const t = state.clock.getElapsedTime();

    // Camera path controlled by scroll + subtle time wobble.
    const camZ = THREE.MathUtils.lerp(10.5, 7.2, p);
    const camY = THREE.MathUtils.lerp(1.1, -0.8, p) + Math.sin(t * 0.25) * 0.12;
    const camX = Math.sin(t * 0.18) * 0.25 + THREE.MathUtils.lerp(-0.35, 0.45, p);
    state.camera.position.set(camX, camY, camZ);
    state.camera.lookAt(0, 0, 0);

    if (group.current) {
      const rot = p * Math.PI * 1.4;
      group.current.rotation.y = rot + t * 0.12;
      group.current.rotation.x = rot * 0.22 + t * 0.06;
      group.current.position.y = THREE.MathUtils.lerp(0.25, -0.35, p);
    }

    // Lights breathe a bit with scroll.
    if (keyLight.current) {
      keyLight.current.intensity = THREE.MathUtils.lerp(1.35, 1.8, p);
      keyLight.current.position.x = THREE.MathUtils.lerp(3.5, -2.5, p);
      keyLight.current.position.y = THREE.MathUtils.lerp(3.0, 4.0, p);
    }
    if (fillLight.current) {
      fillLight.current.intensity = THREE.MathUtils.lerp(0.65, 1.15, p);
      fillLight.current.position.z = THREE.MathUtils.lerp(2.0, -1.0, p);
    }

    // Flipbook frame selection (only update when the index changes).
    if (framesReady && frameTexturesRef.current.length > 0 && frameMatRef.current) {
      // Keep the frame plane visible; fade it slightly as you scroll.
      frameMatRef.current.opacity = THREE.MathUtils.lerp(1.0, 0.55, p);

      const maxIdx = frameTexturesRef.current.length - 1;
      const idx = THREE.MathUtils.clamp(Math.floor(p * maxIdx), 0, maxIdx);

      if (idx !== prevFrameIdxRef.current) {
        prevFrameIdxRef.current = idx;
        const nextTex = frameTexturesRef.current[idx];
        frameMatRef.current.map = nextTex;
        frameMatRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <color attach="background" args={['#070A10']} />

      <directionalLight ref={keyLight} position={[3.5, 3.0, 3.0]} color={'#E8EEFF'} intensity={1.35} />
      <pointLight ref={fillLight} position={[-2.5, -0.2, 2.0]} color={'#67E8F9'} intensity={0.65} />
      <ambientLight intensity={0.35} />

      <group ref={group}>
        <mesh geometry={shapes.geoB} material={shapes.matB} position={[-1.8, 0.15, 0]} />
        <mesh geometry={shapes.geoA} material={shapes.matA} position={[0.2, -0.2, -0.3]} />
        <mesh geometry={shapes.geoC} material={shapes.matC} position={[2.1, 0.35, 0.2]} />
      </group>

      {/* Main machine visuals come from the scroll frame flipbook */}
      <mesh position={[0, 0.22, 0]}>
        <planeGeometry args={[6.2, 6.2 / frameAspect]} />
        <meshBasicMaterial
          ref={frameMatRef}
          map={undefined}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>

      <Environment preset="city" />
    </>
  );
}

export default function Homepage3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ fov: 42, position: [0, 1, 10.5], near: 0.1, far: 100 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Scene scrollYProgress={scrollYProgress} />
    </Canvas>
  );
}

