import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import Comment from '../../../../components/roadmapPage/comment/comment.component';

import './description.css';

type CommentData = {
  usersName: string;
  userImage: string;
  rating: number;
  comment: string;
};

type Props = {
    initialText: string
}

const Description = (props: Props) => {
  const { 
    initialText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...', 
  } = props;
  const [ collapse, setCollapse ] = useState(false);
  const [ commentText, setCommentText ] = useState('');
  const [ commentRating, setCommentRating ] = useState(0);
  const [ showFullText, setShowFullText ] = useState(false);
  const maxTextLength = 350;
  const [ comments, setComments ] = useState<CommentData[]>([]);

  const handleCommentSubmit = () => {
    if (commentRating > 0 && commentText.trim() !== '') {
      // Create a new comment object
      const newComment = {
        usersName: 'User',  // You can customize the user name or fetch it from authentication
        userImage: 'https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png',
        rating: commentRating,
        comment: commentText,
      };

      // Update the list of comments with the new comment
      setComments((prevComments) => [ ...prevComments, newComment ]);

      // Clear the comment input after submission
      setCommentText('');
      // Reset the rating to 0
      setCommentRating(0);
    } else {
      // Handle the case where either rating or comment text is missing
      console.log('Please provide both rating and comment text.');
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
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
            <Comment usersName='Anonymous'
              userImage='https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png'
              rating={4.5}
              comment={'Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review.'} 
            />

            <Comment usersName='Guest'
              userImage='https://www.hotelbooqi.com/wp-content/uploads/2021/12/128-1280406_view-user-icon-png-user-circle-icon-png.png'
              rating={3}
              comment={'Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review. Some good review.'} 
            />
          </div>
          {/*<div className='description__coment'>
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
                    value={commentRating}
                    onChange={ratingChanged}
                    size={30}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
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
            </div>*/}
        </Col>
      </Row>
    </Container>
  );
};


export default Description;