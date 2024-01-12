import React from 'react';
import { Container } from 'react-bootstrap';
import CreateMapButton from '../../../../components/homePageComponents/buttons/CreateMapButton';
import RoadmapCard from '../../../../components/roadmapCard/roadmapCard';
import RoadmapCardMini from '../../../../components/homePageComponents/roadmapCardMini/roadmapCardMini';
import { signedMapsData } from './signedMapsData';
import Carousel from '../../../../components/homePageComponents/slider/Slider';

import './homeInfo.css';

const homeInfo = () => {
  const handleHeartClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the outer card
    event.stopPropagation();
  };

  return (
    <Container className="homeInfo">
      <div className='homeInfo__headline'>
        <div className="homeInfo__headline_turquoiseHeadline">Complete </div> the map and <div className="homeInfo__headline_turquoiseHeadline">share </div>
      </div>
      <div className='homeInfo__headline'>
        <div className="homeInfo__headline_turquoiseHeadline">your </div>experience
      </div>
      <div className='homeInfo__forCreateMapButton'>
        <CreateMapButton/>
      </div>
      <div className="homeInfo__info">
        <div className="homeInfo__info_context">
          <div className='homeInfo__info_context_text'>Top roadmaps</div>
          <div className='homeInfo__info_context_maps'>
            <RoadmapCard  name={'Python Developer'} rating={5} />
            <RoadmapCard  name={'Java Developer'} rating={4.5}/>
            <RoadmapCard  name={'Node.js Developer'} rating={4.7}/>
            <RoadmapCard  name={'Python Developer'} rating={4.5}/>
          </div>
        </div>
        <div className='homeInfo__info_context'>
          <div className='homeInfo__info_context_text'>Signed roadmaps</div>
          <div className='homeInfo__info_context_miniMaps'>
            <Carousel data={signedMapsData} showToggleHeart={true} />
          </div>
        </div>
        <div className='homeInfo__info_context'>
          <div className='homeInfo__info_context_text'>Favourite roadmaps</div>
          <div className='homeInfo__info_context_miniMaps'>
            <Carousel data={signedMapsData} showToggleHeart={true}/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default homeInfo;