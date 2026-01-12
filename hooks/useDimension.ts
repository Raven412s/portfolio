import * as React from 'react';

export default function useDimension(ref: React.RefObject<HTMLDivElement | null>) {
  const [dimension, setDimension] = React.useState({
    width: 0,
    height: 0,
    pixelRatio: 1,
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const getSize = () => {
      try {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        return {
          width: rect.width,
          height: rect.height,
          pixelRatio: window.devicePixelRatio
        };
      } catch (error) {
        console.error('Error getting container dimensions:', error);
        return null;
      }
    };

    const handleResize = () => {
      const newSize = getSize();
      if (newSize) setDimension(newSize);
    };

    // Initial measurement with safety checks
    const timer = setTimeout(() => {
      if (ref.current) {
        handleResize();
      }
    }, 100);

    const resizeObserver = ref.current ? new ResizeObserver(handleResize) : null;
    if (resizeObserver && ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver?.disconnect();
    };
  }, [ref]);

  return dimension;
}
