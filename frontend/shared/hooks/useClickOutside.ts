import { RefObject, useEffect, useEffectEvent } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  cb: () => void
) => {
  const onClickOutside = useEffectEvent(cb);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
