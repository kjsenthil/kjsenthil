import { useState, useEffect, useRef, RefObject } from 'react';

export interface StickyRefReturnProps {
  stickyEnabled: boolean;
  stickyRef: RefObject<HTMLDivElement>; // only recognized as div at the moment instead of span, html, etc
}

const useStickyRef = (): StickyRefReturnProps => {
  const [stickyEnabled, setSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (stickyRef.current) {
      setSticky(stickyRef.current.getBoundingClientRect().top < -50);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return { stickyEnabled, stickyRef };
};

export default useStickyRef;
