import React from 'react';
import ReadMoreButton from '../homePageComponents/buttons/ReadMoreButton';

import './roadmapCard.css';

type Props = {
  name: string;
  rating: number;
}

const RoadmapCard = (props: Props) => {
  const {
    name = 'Python Developer',
    rating = 4.3,
  } = props;
  
  return (
    <div className='roadmapCard'>
      <div className='roadmapCard__name'>{name}</div>
      <div className='roadmapCard__moreInfo'>
        <ReadMoreButton/>
        <div className='roadmapCard__moreInfo_rating'>
          <i className="roadmapCard__moreInfo_rating_union fa-solid fa-star"></i>
          <div className='roadmapCard__moreInfo_rating_number'>{rating}</div>
        </div>
      </div>
    </div>
  );    
};


export default RoadmapCard;