import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import './developer.css';

const DevelopersSlide = () => {
  return ( 
    <Container className='developers-slide' >
      <Row className='justify-content-md-center'>
        <Col >
          <h3>Developers</h3>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col  md="auto">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        </Col>
        <Col md="auto">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" /> 
        </Col>
        <Col md="auto">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"  />
        </Col>
        <Col md="auto">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        </Col>
      </Row>
    </Container>
  );
};
 
export default DevelopersSlide;