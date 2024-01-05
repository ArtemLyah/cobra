/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface DropdownProps {
  title: string;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const dropdownListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const useOutSideClick = (e: MouseEvent) => {
      if (!dropdownListRef.current || !dropdownListRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', useOutSideClick);

    return () => {
      document.removeEventListener('mousedown', useOutSideClick);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownListRef} onClick={() => setIsOpen(!isOpen)}>
      <span >
        {title}&nbsp;
        <i className="fa-solid fa-caret-down" />
      </span>
      {isOpen && 
        <div className="dropdown-content">
          {children}
        </div>
      }
    </div>
  );
};

export default Dropdown;
