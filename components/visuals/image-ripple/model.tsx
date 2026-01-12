/* eslint-disable react-hooks/refs */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useFBO, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import useMouse from '@/hooks/useMouse';
import { vertex, fragment } from './shaders';
import { ContainerSize } from './ImageRipple';

interface ModelProps {
  src: string;
  containerSize: ContainerSize;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface Uniforms extends Record<string, THREE.IUniform<THREE.Texture | THREE.Vector2 | null>> {
  uDisplacement: THREE.IUniform<THREE.Texture | null>;
  uTexture: THREE.IUniform<THREE.Texture | null>;
  winResolution: THREE.IUniform<THREE.Vector2>;
}

function createImageScene(viewport: { width: number; height: number }, texture: THREE.Texture) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    viewport.width / -2,
    viewport.width / 2,
    viewport.height / 2,
    viewport.height / -2,
    -1000,
    1000
  );
  camera.position.z = 2;
  scene.add(camera);

  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const image = new THREE.Mesh(geometry, material);

  image.position.set(0, 0, 1);
  image.scale.set(viewport.width, viewport.height, 1);

  scene.add(image);
  return { scene, camera };
}

export default function Model({ src, containerSize, containerRef }: ModelProps) {
//   const { viewport } = useThree();
  const brushTexture = useTexture('/brush.png');
  const faceTexture = useTexture(src, (texture) => {
    if (texture instanceof THREE.Texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
    }
  });

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [meshes, setMeshes] = useState<React.ReactNode[]>([]);
  const mouse = useMouse() as { x: number; y: number };
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
  const [currentWave, setCurrentWave] = useState(0);
  const { camera } = useThree();

  const scene = useMemo(() => new THREE.Scene(), []);
  const max = 100;

  const uniforms = useRef<Uniforms>({
    uDisplacement: { value: null },
    uTexture: { value: null },
    winResolution: {
      value: new THREE.Vector2(containerSize.width, containerSize.height)
    },
  });

  const { scene: imageScene, camera: imageCamera } = useMemo(
    () => createImageScene({
      width: containerSize.width,
      height: containerSize.height
    }, faceTexture),
    [containerSize, faceTexture]
  );

  const fboBase = useFBO(
    Math.max(1, Math.floor(containerSize.width)),
    Math.max(1, Math.floor(containerSize.height))
  );
  const fboTexture = useFBO(
    Math.max(1, Math.floor(containerSize.width)),
    Math.max(1, Math.floor(containerSize.height))
  );

  useEffect(() => {
    const generatedMeshes = Array.from({ length: max }).map((_, i) => (
      <mesh
        key={i}
        position={[0, 0, 0]}
        ref={(el) => { meshRefs.current[i] = el; }}
        rotation={[0, 0, Math.random()]}
        visible={false}
      >
        <planeGeometry args={[60, 60, 1, 1]} />
        <meshBasicMaterial transparent={true} map={brushTexture} />
      </mesh>
    ));
    setMeshes(generatedMeshes);

    return () => {
      brushTexture.dispose();
      faceTexture.dispose();
      fboBase.dispose();
      fboTexture.dispose();
    };
  }, [brushTexture, faceTexture, fboBase, fboTexture]);

  function setNewWave(x: number, y: number, index: number) {
    const mesh = meshRefs.current[index];
    if (mesh) {
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.visible = true;
      (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
      mesh.scale.x = 1.75;
      mesh.scale.y = 1.75;
    }
  }

  function trackMousePos(x: number, y: number) {
    if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
      setCurrentWave((prev) => (prev + 1) % max);
      setNewWave(x, y, currentWave);
    }
    setPrevMouse({ x, y });
  }

  useFrame(({ gl, scene: finalScene }) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerX = mouse.x - rect.left;
    const containerY = mouse.y - rect.top;

    const x = (containerX / containerSize.width) * 2 - 1;
    const y = -(containerY / containerSize.height) * 2 + 1;

    const worldX = x * (containerSize.width / 2);
    const worldY = y * (containerSize.height / 2);

    trackMousePos(worldX, worldY);

    meshRefs.current.forEach((mesh) => {
      if (mesh && mesh.visible) {
        mesh.rotation.z += 0.025;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity *= 0.95;
        mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
        mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
        if (mat.opacity < 0.001) mesh.visible = false;
      }
    });

    if (containerSize.width > 0 && containerSize.height > 0) {
      gl.setRenderTarget(fboBase);
      gl.clear();

      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) scene.add(mesh);
      });
      gl.render(scene, camera);

      meshRefs.current.forEach((mesh) => {
        if (mesh && mesh.visible) scene.remove(mesh);
      });

      uniforms.current.uTexture.value = fboTexture.texture;
      gl.setRenderTarget(fboTexture);
      gl.render(imageScene, imageCamera);
      uniforms.current.uDisplacement.value = fboBase.texture;

      gl.setRenderTarget(null);
      gl.render(finalScene, camera);

      uniforms.current.winResolution.value.set(
        containerSize.width * containerSize.pixelRatio,
        containerSize.height * containerSize.pixelRatio
      );
    }
  }, 1);

  return (
    <group>
      {meshes}
      <mesh>
        <planeGeometry args={[containerSize.width, containerSize.height, 1, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          uniforms={uniforms.current}
        />
      </mesh>
    </group>
  );
}