import React from 'react';
import { Container, Col } from 'react-bootstrap';

const DescriptionSlide = () => {
  return ( 
    <Container>
      <Col>
        <Container className="description-text">
          <p>some text</p>
        </Container>
      </Col>
      <Col>
        <Container className="description">
          <p>some </p>
        </Container>
      </Col>
    </Container>
  );
};
 
export default DescriptionSlide;