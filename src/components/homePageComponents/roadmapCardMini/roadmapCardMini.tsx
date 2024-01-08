import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

import './roadmapCardMini.css';

type Props = {
    name: string;
    rating: number;
    key?: number;
    toggleHeart?: boolean;
    link: string;
};

const RoadmapCardMini = (props: Props) => {
  const [ isFav, setIsFav ] = useState(false);
  function toggleHeart () {
    setIsFav(!isFav);
  }

  const handleHeartClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the outer card
    event.stopPropagation();
    toggleHeart();
  };

  const{
    name = 'Python Developer',
    rating = 4.3,
    
  } = props;

  return (
    <div className={`roadmapCardMini ${ props.toggleHeart }`}>
      <Link to={props.link} className='roadmapCardMini__name'>{name}</Link>
      <div className='roadmapCardMini__icons'>
        {props.toggleHeart && 
          <div className='roadmapCardMini__icons_fav_btn' onClick={handleHeartClick}>
            <i className={isFav ? 'fa-regular fa-heart' : 'fa-solid fa-heart'} />
          </div>
        }
        <div className='roadmapCardMini__rating'>
          <i className='roadmapCardMini__rating_union fa-solid fa-star'></i>
          <div className='roadmapCardMini__rating_number'>{rating}</div>
        </div>
      </div>
    </div>
  );
};
export default RoadmapCardMini;