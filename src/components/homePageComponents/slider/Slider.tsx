import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import Slider from 'react-slick';
import RoadmapCardMini from '../roadmapCardMini/roadmapCardMini';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';
import { MyRoadmapsResponse } from '../../../api/responses/myRoadmaps.response';
import { RoadmapShortResponse } from '../../../api/responses/roadmapShort.response';

type ArrowProps = {
    onClick?: MouseEventHandler<HTMLDivElement>
}

const SampleNextArrow: React.FC<ArrowProps>  = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="homeInfo__info_context_maps_angle right-arrow">
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </div>
  );
};

const SamplePrevArrow: React.FC<ArrowProps>  = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="homeInfo__info_context_maps_angle left-arrow">
      <i className="fa fa-angle-left" aria-hidden="true"></i>
    </div>
  );
};

interface CarouselProps {
  data: RoadmapShortResponse[],
  myMaps: MyRoadmapsResponse,
  setMyMaps: Dispatch<SetStateAction<MyRoadmapsResponse>>
}

export const Carousel = ({ data, myMaps, setMyMaps }: CarouselProps) => {
  const roadmapLength = data.length > 3 ? 3 : data.length;  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: roadmapLength,
    slidesToScroll: roadmapLength,
    initialSlide: 0,
    centerPadding: '25%',
    nextArrow: 
      <SampleNextArrow />,
    prevArrow: 
      <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...sliderSettings}>
        { data.map((roadmap) => 
          <div key={roadmap.id}>
            <RoadmapCardMini roadmap={roadmap} myMaps={myMaps} setMyMaps={setMyMaps}/>
          </div>
        ) }
      </Slider>
    </div>
  );
};