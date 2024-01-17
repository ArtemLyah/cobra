import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MyRoadmapsResponse } from '../../api/responses/myRoadmaps.response';
import { roadmapService } from '../../api/services/roadmap.service';
import useCookie from '../../hooks/useCookie';
import '../styles/home.css';
import HomeInfo from './slides/homeInfo/homeInfo';
import Search from './slides/search/Search.slide';

const HomePage = () => {
  const [ myMaps, setMyMaps ] = useState<MyRoadmapsResponse>({
    signed: [],
    favorite: [],
    owned: [],
  });
  const { token } = useCookie();

  const getMaps = async () => {
    await roadmapService.getMyMaps(token).then((result: MyRoadmapsResponse) => {
      setMyMaps(result);
      console.log(result);
    });
  };

  useEffect(() => {
    getMaps();
  }, []);

  return (
    <Container className="homePage">
      <HomeInfo myMaps={myMaps} setMyMaps={setMyMaps}/>
      <Search myMaps={myMaps} setMyMaps={setMyMaps}/>
    </Container>
  );
};

export default HomePage;