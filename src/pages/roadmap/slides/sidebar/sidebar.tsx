import React, { useState } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

import './sidebar.css';

type Props = {
    tags: string[],
    progress: number,
    completedRoadmapCount: number,
}

const Sidebar = (props: Props) => {
  const { tags, completedRoadmapCount, progress } = props;
  const [ isFav, setIsFav ] = useState(false);
  const [ isSub, setIsSub ] = useState(false);

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
                onClick={() => setIsSub(!isSub)} >
                {isSub ? 'Subscribed!' : 'Subscribe'}
              </button>
              <button className='fav-btn' onClick={() => setIsFav(!isFav)}>
                <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
              </button>
            </div>
            <span>{completedRoadmapCount} people finished this roadmap</span>
          </div>

          <div className="sidebar-item progressbar">
            <div className="progress__info">
              <span>Your progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar now={progress} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;