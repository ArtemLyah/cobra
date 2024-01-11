import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

import './header.css';

type Props = {
    name: string,
    rating: number,
    autor: string,
    date: string,
    reviews: number,
}

const Header = (props: Props) => {
  const { 
    name='Python Developer', 
    rating=4.7, 
    autor='John Doe', 
    date='27 October 2023',
    reviews=100,
  } = props;
  return (
    <Container className='roadmapHeader'>
      <Row className='header__info'>
        <Col>
          <Row>
            <Col sm={7} className='general'>
              <span className='map__title'>{name}</span>
              
              <div className="general__info">
                <div id='author-date-col'>
                  <span className='author'> by {autor}</span>
                  <span className='date'>{date}</span>
                </div>
              </div>
            </Col>
            <Col sm={5} className='rate'>
              <div className='rate__info'>
                <i className="rate__info__union fa fa-star" aria-hidden="true"></i>
                <div className='rate__info__text'>{rating}</div>
              </div>
              <div className='reviews'>
                <div className='reviews__text'>Reviews</div>
                <div className='reviews__number'>{reviews}</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
