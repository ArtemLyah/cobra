import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './preview.css';

const PreviewSlide = () => {
  const navigate = useNavigate();

  return ( 
    <Container className='previewSlide'>
      <Container>
        <Row className='title'>
          <Col>
            <h1><span className='title-style'>Co</span>de <span className='title-style'>bra</span>nch</h1>
            <h5>IT, code, programing, learning, roadmap, share, expirience</h5>
          </Col>
        </Row>
    
        <Row className='auth-btn '>
          <Col >
            <Button variant='success' className='btn1' onClick={() => navigate('/auth/login')}>Log In</Button>
            <Button variant='light' className='btn2' onClick={() => navigate('/auth/register')}>Sign Up</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
 
export default PreviewSlide;