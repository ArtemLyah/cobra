import React, { Dispatch, SetStateAction } from 'react';
import { Container } from 'react-bootstrap';
import CreateMapButton from '../../../../components/homePageComponents/buttons/CreateMapButton';
import RoadmapCard from '../../../../components/roadmapCard/roadmapCard';
import { Carousel } from '../../../../components/homePageComponents/slider/Slider';
import './homeInfo.css';
import { MyRoadmapsResponse } from '../../../../api/responses/myRoadmaps.response';

interface HomeInfoProps {
  myMaps: MyRoadmapsResponse,
  setMyMaps: Dispatch<SetStateAction<MyRoadmapsResponse>>
}

const homeInfo = ({
  myMaps,
  setMyMaps,
}: HomeInfoProps) => {
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
            <Carousel data={myMaps.signed} myMaps={myMaps} setMyMaps={setMyMaps}/>
          </div>
        </div>
        <div className='homeInfo__info_context'>
          <div className='homeInfo__info_context_text'>Favourite roadmaps</div>
          <div className='homeInfo__info_context_miniMaps'>
            <Carousel data={myMaps.favorite} myMaps={myMaps} setMyMaps={setMyMaps}/>
          </div>
        </div>
        <div className='homeInfo__info_context'>
          <div className='homeInfo__info_context_text'>Your own roadmaps</div>
          <div className='homeInfo__info_context_miniMaps'>
            <Carousel data={myMaps.owned} myMaps={myMaps} setMyMaps={setMyMaps}/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default homeInfo;