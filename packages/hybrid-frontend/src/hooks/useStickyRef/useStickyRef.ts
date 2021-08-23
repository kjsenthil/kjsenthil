import { useState, useEffect, useRef, RefObject } from 'react';

export interface StickyRefProps {
  stickyEnabled: boolean;
  elementRef: RefObject<HTMLDivElement>;
}

const useStickyRef = (): StickyRefProps => {
  const [stickyEnabled, setSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (elementRef.current) {
      setSticky(elementRef.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return { stickyEnabled, elementRef };
};

export default useStickyRef;
