import React from 'react';
import { Col, Row } from 'react-bootstrap';

import './footer.css';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <div className="wrapper">
      <div className="footer">
        <div className='row '>
          <Col className='col-xl-3 col-md-4 col-sm-4 col-xs-6 link'>
            <h5>Navigation</h5>
            <ul>
              <li><a href='/'>Home Page</a></li>
              <li><a href='/about'>About Us</a></li>
              <li><a href='/#search'>Find Roadmaps</a></li>
              <li><a href='/profile'>Manage Profile</a></li>
            </ul>
          </Col>
          <Col className='col-xl-3 col-md-4 col-sm-4 col-xs-6 link'>
            <h5>Resources</h5>
            <ul>
              <li><a href='#'>Terms & Conditions</a></li>
              <li><a href='#'>Privacy</a></li>
              <li><a href='#'>Cookies Declaration</a></li>
              <li><a href='#'>FAQ</a></li>
            </ul>
          </Col>
          <Col className='col-xl-2 col-md-4 col-sm-4 col-xs-6 link'>
            <div className='gh'>
              <h5>GitHub</h5>
              <i className='fa-brands fa-github'/>
            </div>
            <ul>
              <li><a href='http://surl.li/ougvw' target='_blank' rel="noreferrer">Front End</a></li>
              <li><a href='http://surl.li/ougwc' target='_blank' rel="noreferrer">Back End</a></li>
            </ul>
          </Col>
          <Col className='col-xl-4 col-md-12 col-sm-12 col-xs-12 contact'>
            <div className='name-slogan'>
              <h3>Code Branch</h3>
              <h6>Code and share your experience</h6>
            </div>
            <form className='contact-us'>
              <p>Contact us via e-mail</p>
              <input type='email'  placeholder='Your e-mail'/>
              <button type='submit'>Send</button>
            </form>

          </Col>
        </div>
        
        <Row className='copy'>
          <Col className='col-12'>
            <hr/>
            <p>
            Copyright © 2023-{currYear} | All Rights Reserved
            </p>
            <p>Made by KPI students</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;