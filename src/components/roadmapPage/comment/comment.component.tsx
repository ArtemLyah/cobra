import React from 'react';
import { Image } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

import './comment.component.css';

type Props = {
  userImage?: string,
  usersName?: string,
  date?: string,
  rating?: number,
  comment?: string,
}

const Comment = (props: Props) => {
  const { 
    userImage='https://via.placeholder.com/86x86',
    usersName='Anonymous',
    rating= 5,
    comment='Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. ',
  } = props;

  return (
    <div className='comment'>
      <div className='comment__user'>
        <Image className='user-image' src={userImage} roundedCircle />
      </div>
      <div className='comment__content'>
        <div className='comment__content__testimonial'>
          <div className='comment__content__testimonial__text'>
            <div className='comment__content__testimonial__text__userName'>{usersName}</div>
          </div>
          <div className='comment__content__testimonial__rating'>
            <ReactStars
              count={5}
              value={rating}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}  
            />
          </div>
        </div>
        <div className='comment__content__comment'>{comment}</div>
      </div>
    </div>
  );
};

export default Comment;