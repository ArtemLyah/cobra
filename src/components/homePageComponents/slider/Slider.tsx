import React, { FC, MouseEventHandler } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import RoadmapCardMini from '../roadmapCardMini/roadmapCardMini';
import './slider.css';

type Props = {
    data: Array<{
        key: number;
        name: string;
        rating: number;
        link: string;
      }>;
      showToggleHeart?: boolean;
}

type ArrowProps = {
    onClick?: MouseEventHandler<HTMLDivElement>
}

const SampleNextArrow: React.FC<ArrowProps>  = (props) => {
  const { onClick } = props;
  return (
    <div onClick={onClick} className="homeInfo__info_context_maps_angle left-arrow">
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

const Carousel: React.FC<Props> = (props) => {
  const { data, showToggleHeart } = props;
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    centerMode: false,
    centerPadding: '25%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '10%',
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
          centerMode: true,
          centerPadding: '22%',
        },
      },
    ],
    nextArrow: 
        <SampleNextArrow />,
    prevArrow: 
        <SamplePrevArrow />,
  };

  return (
    <Slider {...sliderSettings}>
      {data.map((item) => 
        <RoadmapCardMini
          link={item.link}
          key={item.key}
          name={item.name}
          rating={item.rating}
          toggleHeart={props.showToggleHeart}
        />
      )}
    </Slider>
  );
};

export default Carousel;