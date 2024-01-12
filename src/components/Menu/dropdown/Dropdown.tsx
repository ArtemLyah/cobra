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

    document.addEventListener('mouseenter', useOutSideClick);
    document.addEventListener('mouseleave', useOutSideClick);

    return () => {
      document.removeEventListener('mouseenter', useOutSideClick);
      document.removeEventListener('mouseleave', useOutSideClick);
    };
  }, []);

  return (
    <div 
      className="dropdown" ref={dropdownListRef} 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      <span >
        {title}&nbsp;
        <i className="fa-solid fa-caret-down" />
      </span> 
      <div 
        className={isOpen ? 'dropdown-content active' : 'dropdown-content inactive'}
        onMouseLeave={() => setIsOpen(false)}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
