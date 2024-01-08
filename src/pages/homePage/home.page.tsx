import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import '../styles/home.css';
import HomeInfo from './slides/homeInfo/homeInfo';
import Search from './slides/search/Search.slide';

const HomePage = () => {
  return (
    <Container className="homePage">
      <HomeInfo/>
      <Search />
    </Container>
  );
};

export default HomePage;