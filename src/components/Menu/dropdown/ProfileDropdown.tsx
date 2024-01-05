/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface DropdownProps {
  title: string;
  children: ReactNode;
}

const ProfileDropdown: React.FC<DropdownProps> = ({ title, children }) => {
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

  const imgStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  };

  const dropdownContainerStyles = {
    margin: '0.2rem 3rem 0 0',
  };

  return (
    <div className="dropdown" style={dropdownContainerStyles} ref={dropdownListRef} onClick={() => setIsOpen(!isOpen)}>
      <img src={title} style={imgStyles}  />
      <div className={isOpen ? 'profile-dropdown-content active' : 'profile-dropdown-content inactive'}>
        {children}
      </div>
    </div>
  );
};

export default ProfileDropdown;
