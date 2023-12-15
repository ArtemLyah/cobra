import React from 'react';
import { Container, Stack } from 'react-bootstrap';
import DescriptionSlide from './slides/description/description.slide';
import DevelopersSlide from './slides/developers/developers.slide';
import PreviewSlide from './slides/preview/preview.slide';
import TargetAudienceSlide from './slides/targetAudience/targetAudience.slide';
import WhoWeAreSlide from './slides/who-we-are/whoWeAre.slide';
import './presentation.css';

const PresentationPage = () => {
  return ( 
    <Container id='Presentation'>
      <Stack gap={6} className='slider'>
        <PreviewSlide/>
        <DescriptionSlide/>
        <TargetAudienceSlide/>
        <DevelopersSlide/>
        <WhoWeAreSlide/>
      </Stack >
    </Container>
  );
};
 
export default PresentationPage;