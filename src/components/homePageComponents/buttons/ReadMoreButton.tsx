import React from 'react';
import { Link } from 'react-router-dom';

const ReadMoreButton = () => {

  
  // const styles = {
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: '10px',
  //   padding: '0 15px',
  //   color: '#5CAB7D',
  //   fontSize: '15px',
  //   height: '40px',
  //   width: '130px',
  // };

  return (
    <Link to='/roadmaps/61350bf7-0a69-4793-b1f2-21f2ed0a8650'>
      <button className='btn'
        /*style={styles}*/>
            Read more
      </button>
    </Link>
  );

};

export default ReadMoreButton;