import React from 'react';
import { Container } from 'react-bootstrap';
import Filter from '../../../../components/homePageComponents/searchSlide/Filter.component';
import SearchbarComponent from '../../../../components/homePageComponents/searchSlide/Searchbar.component';
import RoadmapList from '../../../../components/homePageComponents/searchSlide/RoadmapList.component';

import './search.css';

const Search = () => {
  return (
    <Container className='search-container'>
      <Filter />
      <SearchbarComponent />
      <RoadmapList />
    </Container>
  );
};

export default Search;