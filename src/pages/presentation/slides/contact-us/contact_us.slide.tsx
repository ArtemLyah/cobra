import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const ContactUsSlide = () => {
  return <Container className='justify-content-center contactUs'>
    <Row>
      <Col  className='contactUs__question'>
        <h3>Have some questions?</h3>
        <Row>
          <h5>Look in FAQ</h5>

        </Row>
      </Col>
      <Col className='contactUs__contact'>
        <h3>OR CONTACT US:</h3>
        <h5>Form or link to contact us</h5>
      </Col>
    </Row>
  </Container>;
};
 
export default ContactUsSlide;