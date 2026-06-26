import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounced;
};
