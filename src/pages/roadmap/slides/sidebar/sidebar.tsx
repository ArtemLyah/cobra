import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserRoadmapState } from '../../../../api/types/userRoadmapState.type';
import { roadmapService } from '../../../../api/services/roadmap.service';
import { useParams } from 'react-router';
import './sidebar.css';

type Props = {
    tags: string[],
    progress: number,
    completedRoadmapCount: number,
    userStates: UserRoadmapState[],
    token: string,
}

const Sidebar = (props: Props) => {
  const { tags, completedRoadmapCount, userStates, token } = props;
  const [ isFav, setIsFav ] = useState(userStates.includes(UserRoadmapState.FAVORITE));
  const [ isSub, setIsSub ] = useState(userStates.includes(UserRoadmapState.SIGNED));

  const roadmapId = useParams().roadmapId ?? '-1';

  const handleChangeState = async (state: UserRoadmapState) => {

    if (userStates.includes(state)) {
      try{
        await roadmapService.removeUserState(token, roadmapId, state)
          .then(() => {
            if (state === UserRoadmapState.SIGNED) setIsSub(!isSub);
            if (state === UserRoadmapState.FAVORITE) setIsFav(!isFav);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try{
        await roadmapService.setUserState(token, roadmapId, state)
          .then(() => {
            if (state === UserRoadmapState.SIGNED) setIsSub(!isSub);
            if (state === UserRoadmapState.FAVORITE) setIsFav(!isFav);
          });
      } catch (e) {
        console.log(e);
      }
    }

  };

  return (
    <Container className='sidebar'>
      <Row>
        <Col>
          <div className="sidebar-item tags">
            <span id='tag__title'>Tags</span>
            <div className='tag-content'>
              {tags.map((item, index) =>
                <div key={index} className='tag-item'>{item}</div>
              )}
            </div>
            <div className="seemore-hide-btns">
              <button className='hide-btn'><i className="fa-solid fa-angle-up" /></button>
              <button className='seemore-btn'><i className="fa-solid fa-angle-down" /></button>
            </div>
          </div>

          <div className="sidebar-item sub-fav">
            <div className="sub-fav-btns">
              <button 
                className={isSub ? 'subscribe-btn active' : 'subscribe-btn inactive'}
                onClick={() => handleChangeState(UserRoadmapState.SIGNED)} >
                {isSub ? 'Subscribed!' : 'Subscribe'}
              </button>
              <button className='fav-btn' onClick={() => handleChangeState(UserRoadmapState.FAVORITE)}>
                <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
              </button>
            </div>
            <span>{completedRoadmapCount} people finished this roadmap</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;