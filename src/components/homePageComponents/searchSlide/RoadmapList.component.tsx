import React from 'react';
import RoadmapListItem from './RoadmapListItem.component';
import { Container } from 'react-bootstrap';

import './styles/roadmapList.css';

const RoadmapList = () => {
  return (
    <Container className='roadmap-list-container'>
      <RoadmapListItem
        title='Python Developer'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed Do eiusmod tempor incididunt ut labore et dolore magna
                     aliquai... Do eiusmod tempor incididunt ut labore et dolore
                     magna aliquai. Do eiusmod tempor incididunt ut labore et dolore
                     magna aliquai..'
        reviews='742'
        rating='4.5' 
        link='/'
      />

      <RoadmapListItem
        title='C# Developer'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed Do eiusmod tempor incididunt ut labore et dolore magna
                     aliquai... Do eiusmod tempor incididunt ut labore et dolore
                     magna aliquai. Do eiusmod tempor incididunt ut labore et dolore
                     magna aliquai..'
        reviews='588'
        rating='4.0' 
        link='/'
      />
      <RoadmapListItem
        title='Java Developer'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                     sed Do eiusmod tempor incididunt ut labore et dolore magna
                     aliquai...magna aliquai. Do eiusmod tempor incididunt ut 
                     labore et dolore magna aliquai..'
        reviews='588'
        rating='4.0' 
        link='/'
      />
    </Container>
  );
};

export default RoadmapList;