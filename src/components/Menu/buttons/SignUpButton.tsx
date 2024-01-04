import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpButton = () => {
  const [ isHovered, setIsHovered ] = useState(false);
  const [ isActive, setIsActive ] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const styles = {
    outline: 'none',
    border: 'none',
    width: '100px',
    height: '40px',
    backgroundColor: '#5CAB7D',
    fontSize: '16px',
    color: 'white',
    fontWeight: '600',
    borderRadius: '5px',
    transform: `scale(${isActive ? '0.95' : isHovered ? '1.02' : '1'})`,
  };

  return (
    <Link to='/auth/register'>
      <button className='btn'
        style={styles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            Sign up
      </button>
    </Link>
  );
};

export default SignUpButton;
