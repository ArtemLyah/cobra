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
    color: '#D5D5D5',
    fontSize: '32px',
    height: '70px',
    width: '250px',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <Link to='/roadmaps/editor'>
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