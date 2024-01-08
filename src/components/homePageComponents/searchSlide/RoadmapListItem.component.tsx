import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/roadmapListItem.css';

type Props = {
  title?: string,
  description?: string,
  reviews?: string,
  rating?: string,
  link: string
}

const RoadmapListItem = (props: Props) => {
  
  const { title, description, reviews, rating } = props;
  const [ isFav, setIsFav ] = useState(false);
  const [ isSub, setIsSub ] = useState(false);

  return (
    <div className='roadmap-list-item'>
      
      <div className='description-container'>
        <p className='map-title'>
          {title}
        </p>
        <text className='map-description'>
          {description}
        </text>
      </div>

      <div className='interaction'>

        <p className='reviews'>
          Reviews: {reviews}
        </p>

        <i className="fa-solid fa-star">
          {rating}
        </i>

        <Link to={props.link} className='read-more-btn'><span>Read more</span></Link>
        
        <div className='sub-fav'>
          <button 
            className={isSub ? 'subscribe-btn active' : 'subscribe-btn inactive'}
            onClick={() => setIsSub(!isSub)} >
            {isSub ? 'Subscribed!' : 'Subscribe'}
          </button>
          <button className='fav-btn' onClick={() => setIsFav(!isFav)}>
            <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapListItem;