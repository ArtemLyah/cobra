import React, { useState, useEffect } from 'react';
import './back-to-top.css';

const BackToTop = () => {
  const [ backToTop, setBackToTop ] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {backToTop &&
        <button className='btn btn-lg btn-success back-to-top btn-floating rounded-circle' onClick={scrollUp}>
          <i className='fas fa-arrow-up'></i>
        </button>
      }
    </div>
  );
};

export default BackToTop;