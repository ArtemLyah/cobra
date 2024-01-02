import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './contact_us.css';

const ContactUsSlide = () => {
  return <Container className='contactUs'>
    <Row>
      <Col  className='contactUsQuestion'>
        <h3>Have some questions?</h3>
        <Row className='row contactUsQuestionFAQ'>
          <h5 className='col col-12 col-md-8'>Look in FAQ</h5>
          <div className='col col-6 col-md-4 containerForButton justify-content-center'>Here</div>
        </Row>
      </Col>
      <Col className='contactUsContact'>
        <h3>OR CONTACT US:</h3>
        <h5>Form or link to contact us</h5>
      </Col>
    </Row>
  </Container>;
};
 
export default ContactUsSlide;