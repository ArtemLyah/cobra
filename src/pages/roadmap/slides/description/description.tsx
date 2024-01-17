import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import Comment from '../../../../components/roadmapPage/comment/comment.component';
import RoadmapCard from '../../../../components/roadmapCard/roadmapCard';

import './description.css';

type Props = {
    initialText: string
}

type CommentData = {
  usersName: string;
  userImage: string;
  rating: number;
  comment: string;
};

const Description = (props: Props) => {
  const { 
    initialText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...', 
  } = props;
  const [ commentText, setCommentText ] = useState('');
  const [ commentRating, setCommentRating ] = useState(0);
  const [ showFullText, setShowFullText ] = useState(false);
  const maxTextLength = 350;
  const [ comments, setComments ] = useState<CommentData[]>([]);
  
  

  const handleCommentSubmit = () => {
    if (commentRating > 0 && commentText.trim() !== '') {
      const newComment: CommentData = {
        usersName: 'Anonymous', 
        userImage:
          'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png',
        rating: commentRating,
        comment: commentText,
      };

      setComments((prevComments) => [ ...prevComments, newComment ]);
      setCommentText('');
      setCommentRating(0);
    } else {
      console.log('Please provide both rating and comment text.');
    }
  };

  const ratingChanged = (newRating: number) => {
    console.log(newRating);
    setCommentRating(newRating);
  };

  const renderText = showFullText || initialText.length <= maxTextLength ? initialText : initialText.slice(0, maxTextLength);


  return (
    <Container className='description'>
      <Row>
        <Col>
          <div className='description__content'>{renderText}</div>
          {initialText.length > maxTextLength && 
            <button className='description__button' onClick={() => setShowFullText((prev) => !prev)}>
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          }
          <div className='description__image'></div>

          <div className="related-maps">
            <span>Related maps</span>
            <div className='related-maps-list'>
              <RoadmapCard
                name='Python Developer'
                rating={4.8} />
              <RoadmapCard
                name='Java Developer'
                rating={4.0} />
              <RoadmapCard
                name='C# Developer'
                rating={4.5} />
            </div>
          </div>

          <div className='description__coment'>
            <div className='description__coment__text'>Rate and leave your comment</div>
            
            <div className='description__coment__boxForComment'>
              <textarea
                placeholder='Write a comment'
                className='description__coment__boxForComment__input'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className='description__coment__boxForComment__buttons'>
                <div className='description__rate'>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700" />
                </div>
                <button className='description__coment__boxForComment__button' onClick={handleCommentSubmit}>
                  Send
                </button>
              </div>
            </div>
            {comments.map((comment, index) => 
              <Comment
                key={index}
                usersName={comment.usersName}
                userImage={comment.userImage}
                rating={comment.rating}
                comment={comment.comment}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default Description;