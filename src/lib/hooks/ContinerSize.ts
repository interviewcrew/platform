import { useState, useEffect, useRef } from 'react';

export function useContainerSize(): [React.RefObject<HTMLDivElement>, { width: number; height: number }] {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      });
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, [ref]);

  return [ref, size];
}
