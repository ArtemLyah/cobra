/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MutableRefObject, useEffect } from 'react';

type OutsideNotifierHook = (
    ref: MutableRefObject<any>,
    onOutsideClick: (isInside: false) => void
) => void;

const useOutSideClick: OutsideNotifierHook = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutsideClick(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ ref, onOutsideClick ]);
};

export default useOutSideClick;