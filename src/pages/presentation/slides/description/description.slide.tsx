import React from 'react';
import { Container, Col, Image } from 'react-bootstrap';
import './description.css';

const DescriptionSlide = () => {

  const descText = ` is a collaborative service aimed at developing roadmaps, guides,
                    and additional educational materials to assist developers in
                    navigating their educational journey. Everyone can make his own roadmap
                    to share his experience in codding in various programming languages! `;

  return ( 
    <Container className="description-slide">
      <Col>
        <Container className="description-text glass">
          <p><strong>Cobra</strong>{descText}<br/><strong id="try">Try it yourself!</strong></p>
        </Container>
      </Col>
      <Col>
        <Container className="description">
          <Image src="https://shorturl.at/fpJR1" id="desc-img"/>
        </Container>
      </Col>
    </Container>
  );
};
 
export default DescriptionSlide;