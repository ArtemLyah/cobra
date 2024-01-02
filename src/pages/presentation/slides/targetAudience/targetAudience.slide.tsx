import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import './targetAudience.css';

const TargetAudienceSlide = () => {
  return ( 
    <Container className='targetAudienceSlide'>
      <Row className='justify-content-center'>
        <Col>
          <h1>To whom this project is</h1>
        </Col>
      </Row>
      <Row className="img-row">
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center img-cols">
          <Image className="img-target-audience"
            src="https://shorturl.at/vwFS2" 
            rounded
          />
          <h5>For beginners</h5>
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center img-cols">
          <Image className="img-target-audience"
            src="https://shorturl.at/vwFS2" 
            rounded
          />
          <h5>For developers</h5> 
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center img-cols">
          <Image className="img-target-audience"
            src="https://shorturl.at/vwFS2" 
            rounded
          />
          <h5>For juniors</h5>
        </Col>
        <Col xs="12" sm="6" md="6" lg='6' xl='auto' className="d-flex flex-column align-items-center img-cols">
          <Image className="img-target-audience"
            src="https://shorturl.at/vwFS2" 
            rounded
          />
          <h5>For middles</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <p id="desc-text" >Our project is the best to learn and improving yourself<br />
             Feel good after new studied topic</p>
        </Col>
      </Row>
    </Container>
  );
};
 
export default TargetAudienceSlide;