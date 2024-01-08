import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReadMoreButton = () => {
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
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    padding: '0 15px',
    color: '#5CAB7D',
    fontSize: '15px',
    height: '40px',
    width: '130px',
  };

  return (
    <Link to='/'>
      <button className='btn'
        style={styles}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            Read more
      </button>
    </Link>
  );

};

export default ReadMoreButton;