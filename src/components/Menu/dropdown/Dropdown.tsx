/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode, useRef } from 'react';
import useOutSideClick from '../useOutSideClickHook/useOutSideClick';

interface DropdownProps {
  title: string;
  children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);
  useOutSideClick(ref, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <span ref={ref} onClick={toggleDropdown}>
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
