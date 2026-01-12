import * as React from 'react';

export default function useMouse() {
  const [mouse, setMouse] = React.useState({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0
  });

  const mouseMove = (e: MouseEvent) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
      clientX: e.clientX,
      clientY: e.clientY
    });
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', mouseMove);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return mouse;
}
