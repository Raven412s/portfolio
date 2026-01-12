import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import Model from './model';
import useDimension from '@/hooks/useDimension';
import { cn } from '@/lib/utils';

interface ImageRippleProps {
  src: string;
  className?: string;
}

// Inferred type from useDimension hook
export interface ContainerSize {
  width: number;
  height: number;
  pixelRatio: number;
}

export default function ImageRipple({ src, className }: ImageRippleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const containerSize = useDimension(containerRef) as ContainerSize;
  const [key, setKey] = useState<number>(0);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    console.error('WebGL context lost');
    setContextLost(true);
  }, []);

  const handleContextRestored = useCallback(() => {
    console.log('WebGL context restored');
    setContextLost(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [handleContextLost, handleContextRestored]);

  if (!containerSize.width || !containerSize.height) {
    return (
      <div ref={containerRef} className={cn("h-full w-full flex items-center justify-center", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (contextLost) {
    const reloadGraphics = () => {
      setKey(prev => prev + 1);
      setContextLost(false);
    };
    reloadGraphics();
  }

  const frustumSize = Math.max(containerSize.height, containerSize.width);
  const aspect = containerSize.width / containerSize.height;

  return (
    <div ref={containerRef} className={cn("h-full w-full relative", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-200 bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <Canvas
        key={key}
        onCreated={({ gl }) => {
          setIsLoading(false);
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setContextLost(true);
          }, false);
          canvas.addEventListener('webglcontextrestored', () => {
            setContextLost(false);
          }, false);
        }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false
        }}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <OrthographicCamera
          makeDefault
          args={[
            (frustumSize * aspect) / -2,
            (frustumSize * aspect) / 2,
            frustumSize / 2,
            frustumSize / -2,
            -1000,
            1000,
          ]}
          position={[0, 0, 2]}
        />
        <Model
          src={src}
          containerSize={containerSize}
          containerRef={containerRef}
        />
      </Canvas>
    </div>
  );
}