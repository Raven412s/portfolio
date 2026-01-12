import { PresentationControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { JSX, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

// 1. Define the specific structure of your GLB file
type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    material_0: THREE.Material
  }
}

// 2. Type the props as Group props { mousePos }: { mousePos: { x: number, y: number } }
export function Model({mousePos,props}:{props?: JSX.IntrinsicElements['group'], mousePos: { x: number, y: number }}) {
  const { nodes, materials } = useGLTF('/self_portrait.glb') as unknown as GLTFResult
  const groupRef = useRef<THREE.Group>(null!)

useFrame(() => {
    // Ab state.mouse ki jagah prop wala mousePos use karein
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      mousePos.x * 0.5, 
      0.1
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      -mousePos.y * 0.5, 
      0.1
    )
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
        position={[0, 0.035, -0.031]}
        rotation={[-1.547, 0, 0]}
      />
    </group>
  )
}

// Helper component to render the scene
export const PortraitScene = ({ mousePos }: { mousePos: { x: number, y: number } }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <React.Suspense fallback={null}>
          {/* PresentationControls fixed props */}
          <PresentationControls
            global
            snap
            speed={1.5}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Stage environment="city" intensity={0.6}>
              {/* Model ke andar se useFrame hata dena agar drag controls use karne hain */}
             <Model mousePos={mousePos} />
            </Stage>
          </PresentationControls>
        </React.Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/self_portrait.glb')