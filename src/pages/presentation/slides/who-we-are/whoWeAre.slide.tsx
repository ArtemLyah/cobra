import React from 'react';
import { Row, Container } from 'react-bootstrap';
import './whoWeAre.css';

const WhoWeAreSlide = () => {
  return (
    <Container className='whoWeAreSlide'>
      <Row>
        <h2 className='whoWeAreTitle'>WHO WE ARE?</h2>
        <p>First of all we need to tell everyone who are we and what do we want</p>
        <h5 className='subtitle'>How we got the idea to create CoBra</h5>
        <p>More information about how we got the idea to create CoBra. Perhaps something about we need something ourselves</p>
      </Row>
    </Container>
  );
};
 
export default WhoWeAreSlide;