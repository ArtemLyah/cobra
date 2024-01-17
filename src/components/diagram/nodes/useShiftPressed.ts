import { useState, useEffect } from 'react';

const useShiftPressed = (): boolean => {
  const [ shiftPressed, setShiftPressed ] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      setShiftPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      setShiftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return shiftPressed;
};

export default useShiftPressed;
