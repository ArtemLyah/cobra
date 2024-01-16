import React from 'react';
import { Container } from 'react-bootstrap';
import './whoWeAre.css';

interface WhoWeAreSlideProps {
  title?: string,
  text?: string,
  blockTitle?: string;
  blockText?: string;
}

const WhoWeAreSlide: React.FC<WhoWeAreSlideProps> = ({
  title = 'WHO WE ARE?',
  text = 'First of all we need to tell everyone who are we and what do we want',
  blockTitle = 'How we got the idea to create CoBra',
  blockText = 'More information about how we got the idea to create CoBra. Perhaps something about we need something ourselves' }) => {

  return (
    <Container className='whoWeAreSlide glass-border'>
      <h2 className='whoWeAreTitle'>{title}</h2>
      {
        text && <p className='whoWeAreText'>{text}</p>
      }
      <h5 className='subtitle'>{blockTitle}</h5>
      <p>{blockText}</p>
    </Container>
  );
};

export default WhoWeAreSlide;
