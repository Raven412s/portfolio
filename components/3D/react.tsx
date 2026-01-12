"use client"

import * as THREE from 'three'
import React, { useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";

// Definimos el tipo de las instancias basándonos en los nodos del GLTF
type GLTFResult = GLTF & {
  nodes: {
    ['React-Logo_Material002_0']: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

/**
 * AQUÍ ESTÁ EL TRUCO: 
 * Extraemos el tipo de los componentes de instancia que genera Merged.
 * 'InstanceProps' es el tipo que define qué propiedades puede recibir cada logo (pos, rot, scale, etc.)
 */
import { InstanceProps } from '@react-three/drei'

// Definimos que nuestro contexto es un objeto donde cada valor es un componente de React
// que acepta las propiedades de una instancia de Drei.
type ContextType = Record<string, React.FC<InstanceProps>>

const context = createContext<ContextType | null>(null)

export function Instances({ children, ...props }: { children: React.ReactNode } & React.ComponentPropsWithoutRef<'group'>) {
  const { nodes } = useGLTF('/react_logo.glb') as unknown as GLTFResult
  
  const instances = useMemo(
    () => ({
      ReactLogoMaterial: nodes['React-Logo_Material002_0'],
    }),
    [nodes]
  )

  return (
    <Merged meshes={instances} {...props}>
      {(instanceComponents: ContextType) => (
        <context.Provider value={instanceComponents}>
          {children}
        </context.Provider>
      )}
    </Merged>
  )
}

export function Model(props: React.ComponentPropsWithoutRef<'group'>) {
  const instances = useContext(context)
  
  if (!instances) {
    throw new Error("Model must be used within an <Instances> component")
  }

  // Ahora 'ReactLogoMaterial' tiene el tipo exacto React.FC<InstanceProps>
  const ReactLogoMaterial = instances.ReactLogoMaterial

  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="RootNode">
            <group
              name="React-Logo"
              position={[0, 7.935, 18.102]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={[39.166, 39.166, 52.734]}
            >
              {/* No marcará error porque InstanceProps permite las props estándar de Three */}
              <ReactLogoMaterial />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/react_logo.glb')


export const ReactModel = () => {
    return (
        <Canvas
                  camera={{ position: [0, 40, 20], fov: 10 }}
                  gl={{ antialias: true }}
                  className="w-full h-full"
                >
                  <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.25} />
                    <spotLight position={[10, 30, 20]} angle={0.5} penumbra={0.5} />
                    
                    <Float speed={2} rotationIntensity={1.3} floatIntensity={2}>
                      <Instances>
                        <Model scale={1} />
                      </Instances>
                    </Float>

                    <ContactShadows 
                      position={[0, 40, 20]} 
                      opacity={0.4} 
                      scale={20} 
                      blur={2.4} 
                      far={20} 
                    />
                  </Suspense>
                </Canvas>
    )
}