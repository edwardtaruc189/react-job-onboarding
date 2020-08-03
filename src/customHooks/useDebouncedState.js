import { useState, useEffect } from 'react';

const useDebouncedState = (initialState, delay = 500) => {
  const [state, setState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(debouncedState);
    }, delay);

    return () => clearTimeout(timer);
  }, [debouncedState]);

  return [state, setDebouncedState];
};

export default useDebouncedState;
