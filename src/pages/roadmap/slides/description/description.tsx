import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import Comment from '../../../../components/roadmapPage/comment/comment.component';
import RoadmapCard from '../../../../components/roadmapCard/roadmapCard';
import { MapStructure } from '../../../../api/types/mapStructure.type';
import DiagramRead from '../../../../components/diagram/diagram_read/diagram_read';
import { useParams } from 'react-router';
import { reviewsService } from '../../../../api/services/reviews.service';
import { useCookie } from '../../../../hooks/useCookie';
import { ReviewsResponse } from '../../../../api/responses/reviews.response';
import { ReviewCreateDTO } from '../../../../api/dtos/review.create';
import { ServerException } from '../../../../api/exceptions/ServerException';
import { AxiosError } from 'axios';
import { useAuth } from '../../../../hooks/useAuth';

import './description.css';

type Props = {
    description: string;
    map: MapStructure;
    reviews: ReviewsResponse[];
};


const Description = (props: Props) => {
  const description = props.description;
  const { auth } = useAuth();
  const [ reviews, setReviews ] = useState<ReviewsResponse[]>(props.reviews);

  const UserComment = reviews.filter((review) => review.user.id === auth?.userId);

  const hasComment = UserComment.length > 0;

  const [ commentText, setCommentText ] = useState<string>(hasComment ? UserComment[0].text : '');
  const [ commentRating, setCommentRating ] = useState<number>(hasComment ? UserComment[0].rate : 0);
  const [ showFullText, setShowFullText ] = useState(false);
  const maxTextLength = 350;

  const roadmapId = useParams().roadmapId ?? '-1';
  const { token } = useCookie();


  const handleCommentSubmit = async () => {
    if (commentRating > 0 && commentText.trim() !== '') {

      const reviewData: ReviewCreateDTO = {
        rate: commentRating,
        comment: commentText,
      };

      const response = await reviewsService.create(token, roadmapId, reviewData)
        .catch((e: AxiosError<ServerException>) => console.log(e));

      if (!response) return;  
      
      if (UserComment.length > 0) {
        setReviews((reviews) =>
          reviews.map((review) => 
            review.userId === UserComment[0].userId ? {
              ...review,
              reviewData,
            } : review
          )
        );
      } else {
        if (!auth) return;

        setReviews(reviews.concat([{
          userId: auth.userId,
          roadmapId: roadmapId,
          rate: commentRating,
          text: commentText,
          user: {
            id: auth?.userId,
            username: auth?.username,
            avatar: auth?.avatar,
          },
        }]));
      }

      setCommentText('');
      setCommentRating(0);


    } else {
      console.log('Please provide both rating and comment text.');
    }
  };

  const ratingChanged = (newRating: number) => {
    setCommentRating(newRating);
  };

  const renderText = showFullText || description.length <= maxTextLength ? description : description.slice(0, maxTextLength)+'...';


  return (
    <Container className='description'>
      <Row>
        <Col>
          <div className='description__content'>{renderText}</div>
          {description.length > maxTextLength && 
            <button className='description__button' onClick={() => setShowFullText((prev) => !prev)}>
              {showFullText ? 'Read less' : 'Read more'}
            </button>
          }
          <div className='description__image'>
            <DiagramRead nodes={props.map.nodes} edges={props.map.edges} />
          </div>

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
                    value={commentRating}
                    size={30}
                    isHalf={false}
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
            {reviews?.map((comment, index) => 
              <Comment
                key={index}
                userImage={comment.user.avatar}
                usersName={comment.user.username}
                rating={comment.rate}
                comment={comment.text}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};


export default Description;