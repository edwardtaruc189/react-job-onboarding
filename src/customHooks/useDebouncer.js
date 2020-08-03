import { useState, useEffect } from 'react';

const useDebouncer = (variable, delay = 500) => {
  const [debounced, setDebounced] = useState(variable);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(variable);
    }, delay);

    return () => clearTimeout(timer);
  }, [variable]);
  return debounced;
};

export default useDebouncer;
