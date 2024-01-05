/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode, useRef } from 'react';
import useOutSideClick from '../useOutSideClickHook/useOutSideClick';

interface DropdownProps {
  title: string;
  children: ReactNode;
}

const ProfileDropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const ref = useRef<any>(null);
  useOutSideClick(ref, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const imgStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    margin: '0.2rem 3rem 0 0',
  };

  return (
    <div className="dropdown">
      <img src={title} ref={ref} style={imgStyles} onClick={toggleDropdown} />
      {isOpen && 
        <div className="dropdown-content">
          {children}
        </div>
      }
    </div>
  );
};

export default ProfileDropdown;
