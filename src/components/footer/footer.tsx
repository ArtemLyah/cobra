import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from '../Modal/modal';

import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currYear = new Date().getFullYear();

  const [ modal, setModal ] = useState(false);

  const [ content, setContent ] = useState('terms');

  const handleSetContent = (content) => {
    setContent(content);
    setModal(true);
  };
  
  const handleCloseModal = () => {
    setModal(false);
  };
  

  return (
    <>
      <Modal content={ content } isOpen={ modal } toggleModal={handleCloseModal} />
      <div className="wrapper">
        <div className="footer">
          <div className='row '>
            <Col className='col-xl-3 col-md-4 col-sm-4 col-xs-6 link'>
              <h5>Navigation</h5>
              <ul>
                <li><Link to='/'>Home Page</Link></li>
                <li><Link to='/about'>About Us</Link></li>
                <li><Link to='/#search'>Find Roadmaps</Link></li>
                <li><Link to='/profile'>Manage Profile</Link></li>
              </ul>
            </Col>
            <Col className='col-xl-3 col-md-4 col-sm-4 col-xs-6 link'>
              <h5>Resources</h5>
              <ul>
                <li><Link onClick={() => handleSetContent('terms')} to='#terms'>Terms & Conditions</Link></li>
                <li><Link onClick={() => handleSetContent('privacy')} to='#privacy'>Privacy</Link></li>
                <li><Link onClick={() => handleSetContent('cookies')} to='#cookies'>Cookies Declaration</Link></li>
                <li><Link to='#'>FAQ</Link></li>
              </ul>
            </Col>
            <Col className='col-xl-2 col-md-4 col-sm-4 col-xs-6 link'>
              <div className='gh'>
                <h5>GitHub</h5>
                <i className='fa-brands fa-github'/>
              </div>
              <ul>
                <li><Link to='https://github.com/ArtemLyah/cobra-front' target='_blank' rel="noreferrer">Front End</Link></li>
                <li><Link to='https://github.com/ArtemLyah/cobra-back' target='_blank' rel="noreferrer">Back End</Link></li>
              </ul>
            </Col>
            <Col className='col-xl-4 col-md-12 col-sm-12 col-xs-12 contact'>
              <div className='name-slogan'>
                <h3>Code Branch</h3>
                <h6>Code and share your experience</h6>
              </div>
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
    </>
  );
};

export default Footer;