import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './preview.css';

const PreviewSlide = () => {
  const navigate = useNavigate();

  const scrollDown = () => {
    
    window.scroll({
      top: 400,
      behavior: 'smooth',
    });
  };

  return ( 
    <Container className='previewSlide'>
      <Row className='title'>
        <Col>
          <h1><span className='title-style'>Co</span>de <span className='title-style'>bra</span>nch</h1>
          <h5>CoBra as a self-learning platform allows </h5>
          <h5>You to go all the way through expirience of</h5>
          <h5 className='last'>anybody you wish. Feel it with</h5>
          <span className='slogan'>Code - Learn - Share | Share - Learn - Code</span>
        </Col>
      </Row>
  
      <Row className='get-started'>
        <Col>
          <button className='start-btn' onClick={() => navigate('/auth/register')}>
            { 'Let\'s Get Started!' }<i className='fa-light fa-arrow-right icon' />
          </button>
        </Col>
      </Row>
      <Row className='add-btn'>
        <Col>
          <button  className='discover-btn' onClick={scrollDown}>Discover CoBra down below</button>
          <button  className='login-btn' onClick={() => navigate('/auth/login')}>Have account? Sign In!</button>
        </Col>
      </Row>
      <Row className='image-slide'>
        <Col>
          <img src={require('./preview.png')} alt='image' />
        </Col>
      </Row>

    </Container>
  );
};
 
export default PreviewSlide;