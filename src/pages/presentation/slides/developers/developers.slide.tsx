import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import './developer.css';


const DevelopersSlide = () => {
  return ( 
    <Container className='developers-slide' >
      <Row className='justify-content-center'>
        <Col >
          <h1>Developers</h1>
        </Col>
      </Row>
      <Row className='text-center align-items-center justify-content-sm-center'>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center">
          <Image 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            roundedCircle
          />
          <h4>Some Name</h4>
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center">
          <Image 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            roundedCircle
          />
          <h4>Some Name</h4> 
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center">
          <Image 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            roundedCircle
          />
          <h4>Some Name</h4>
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center">
          <Image 
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
            roundedCircle
          />
          <h4>Some Name</h4>
        </Col>
      </Row>
    </Container>
  );
};
 
export default DevelopersSlide;