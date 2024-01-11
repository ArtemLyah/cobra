import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateMapButton = () => {
  const [ isHovered, setIsHovered ] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const backgroundColor = isHovered
    ? 'rgba(74, 219, 200, 0.5)'
    : 'transparent';
  
  const styles = {
    backgroundColor,
    borderRadius: '0',
    border: '4px solid #4ADBC8',
    padding: '0 38px',
    color: '#D5D5D5',
    fontSize: '45px',
    height: '90px',
    width: '360px',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <Link to='/'>
      <button className='btn'
        style={styles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            Create map
      </button>
    </Link>
  );

};

export default CreateMapButton;