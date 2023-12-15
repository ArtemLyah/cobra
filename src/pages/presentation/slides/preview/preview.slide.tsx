import React from 'react';
import { Container } from 'react-bootstrap';
import './preview.css';

const PreviewSlide = () => {
  return ( 
    <Container className='previewSlide'>
      <Container className='title'>
        <h1><span className='title-style'>Co</span>de <span className='title-style'>bra</span>nch</h1>
        <h5>IT, code, programing, learning, roadmap, share, expirience</h5>
      </Container>
    </Container>
  );
};
 
export default PreviewSlide;