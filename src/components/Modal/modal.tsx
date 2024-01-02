/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Terms, Cookies, Privacy } from './resources/TextContent';

import './modal.css';

export const Modal = ( { isOpen, toggleModal, content } ) =>{

  let ModalContent: (() => JSX.Element); //
  switch (content) {
  case 'terms':
    ModalContent = Terms;
    break;
  case 'cookies':
    ModalContent = Cookies;
    break;
  case 'privacy':
    ModalContent = Privacy;
    break;
  default:
    ModalContent = Terms;
    break;
  }

  return (
    <>
      { isOpen && 
        <>
          <div className='bg-modal'/>
          <div className='wrapper-modal'>
            <div className='content-modal'>
              <div className=''>
                <button className='close-btn' onClick={toggleModal}><i className="fa-light fa-lg fa-circle-xmark"></i></button>
              </div>
              <div className='list'>
                <ModalContent />
              </div>
            </div>
          </div>
        </>
      }
    </>
    
  );
};

export default Modal;