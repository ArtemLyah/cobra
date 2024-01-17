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
      setError('error occurred');
      console.log(e);
    }
  };

  useEffect(() => {
    getRoadmap();
  }, []);
  
  console.log(roadmap);

  return (
    <Container className='roadmap-page'>
      <Row>
        <Col>
          <Header 
            name='Python Developer' 
            rating={4.7} 
            date='27 October 2023' 
            autor='John Doe'
            reviews={100}/>
        </Col>
      </Row>
      <Row>
        <Col sm={9}>
          <Description  initialText='Longer TagLorem ipsum dolor sit amet, consectetur adipiscing elit, sed Do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'/>
        </Col>
        <Col sm={3}>
          <Sidebar 
            tags = {[ 'Tag 1', 'Longer Tag 2', 'Tag 3', 'Longer Tag 4', 'Tag 5', 'Tag 6', 'Tag 7' ]}
            completedRoadmapCount = {768}
            progress = {73} />
        </Col>
      </Row>
    </Container>
  );
};
export default RoadmapPage;