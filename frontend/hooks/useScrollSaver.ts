import { RefObject, useEffect } from 'react';

import useSessionStorage from '@hooks/useSessionStorage';

const useScrollSaver = (elementRef: RefObject<HTMLDivElement>, key: string) => {
  const { value: scroll, setValue: setScroll } = useSessionStorage(key, 0);

  useEffect(() => {
    if (!elementRef.current) return undefined;
    let ticking = false;

    const handleScroll = () => {
      if (!elementRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (elementRef.current) setScroll(elementRef.current.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    elementRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (!elementRef.current) return;
      elementRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef.current]);

  return { scroll, setScroll };
};

export default useScrollSaver;
