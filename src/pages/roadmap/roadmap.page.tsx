import React, { useState, useEffect } from 'react';
import Header from './slides/header/header';
import Description from './slides/description/description';
import Sidebar from './slides/sidebar/sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { roadmapService } from '../../api/services/roadmap.service';
import { useCookie } from '../../hooks/useCookie';
import { FullRoadmapResponse } from '../../api/responses/fullRoadmap.response';


const RoadmapPage = () => {
  const roadmapId = useParams().roadmapId ?? '-1';
  
  const { token } = useCookie();

  const [ roadmap, setRoadmap ] = useState<FullRoadmapResponse>();

  const getRoadmap = async () => {
    try {
      await roadmapService.getWithMap(token, roadmapId).then((response: FullRoadmapResponse) => {
        setRoadmap(response);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRoadmap();
  }, []);
  

  if  (!roadmap) return (
    <div>
      Loading...
    </div>
  );

  return (
    <Container className='roadmap-page'>
      <Row>
        <Col>
          <Header 
            name={roadmap.title}
            rating={roadmap.rating} 
            date={roadmap.created_at.toString().slice(0, 10)} 
            autor={roadmap.owner.username}
            reviews={roadmap.reviews.length}/>
        </Col>
      </Row>
      <Row>
        <Col sm={9}>
          <Description  description={roadmap.description} map={roadmap.map} reviews={roadmap.reviews}/>
        </Col>
        <Col sm={3}>
          <Sidebar 
            tags = {roadmap.tags.map((tag) => tag.name)}
            completedRoadmapCount = {768}
            progress = {73}
            userStates = {roadmap.userStates} 
            token = {token} />
        </Col>
      </Row>
    </Container>
  );
};
export default RoadmapPage;