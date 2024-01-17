import React from 'react';
import { Image } from 'react-bootstrap';

import './description.css';
import { Link } from 'react-router-dom';

const DescriptionSlide = () => {

  const descText = ` is a collaborative service aimed at developing roadmaps, guides,
                    and additional educational materials to assist developers in
                    navigating their educational journey. Everyone can make his own roadmap
                    to share his experience in codding in various programming languages! `;

  return ( 
    <div className="description-slide">
      <div className='row glass-border'>
        <div className="description-text ">
          <p><strong>CoBra</strong>{descText}<br/></p>
          <div className='full-width'>
            <Link className='simple-link' to='/auth/register'>Try it yourself!</Link>
          </div>
        </div>
        <div className="description-image">
          <Image src="https://shorturl.at/fpJR1" id="desc-img"/>
        </div>
      </div>
    </div>
  );
};
 
export default DescriptionSlide;