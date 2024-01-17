import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { RoadmapShortResponse } from '../../../../api/responses/roadmapShort.response';
import { roadmapService } from '../../../../api/services/roadmap.service';
import { RoadmapDifficultyEnum } from '../../../../api/types/roadmapDifficulty.type';
import SortByComponent from '../../../../components/homePageComponents/searchSlide/SortBy.component';
import RoadmapListItem from '../../../../components/homePageComponents/searchSlide/RoadmapListItem.component';
import SearchbarComponent from '../../../../components/homePageComponents/searchSlide/Searchbar.component';
import useCookie from '../../../../hooks/useCookie';
import './search.css';
import { MyRoadmapsResponse } from '../../../../api/responses/myRoadmaps.response';

enum FilterBy {
  RATING=0,
  POPULARITY=1,
  DIFFICULTY=2,
  NEWEST=3,
}

interface SearchProps {
  myMaps: MyRoadmapsResponse,
  setMyMaps: Dispatch<SetStateAction<MyRoadmapsResponse>>
}

const Search = ({
  myMaps,
  setMyMaps,
}: SearchProps) => {
  const [ maps, setMaps ] = useState<RoadmapShortResponse[]>([]);
  const [ filterBy, setFilterBy ] = useState<number | null>(null);
  const { token } = useCookie();

  useEffect(() => {
    roadmapService.getAll(token).then((result) => {
      setMaps(result);
    });
  }, []);

  const sortMaps = () => {
    if (filterBy === FilterBy.RATING) 
      return maps.sort((mapA, mapB) => mapB.rating - mapA.rating);
    
    else if (filterBy === FilterBy.POPULARITY)
      return maps.sort((mapA, mapB) => mapB.reviewsAmount - mapA.reviewsAmount);
    
    else if (filterBy === FilterBy.DIFFICULTY)
      return maps.sort((mapA, mapB) => {
        const getWeight = (map: RoadmapShortResponse) => {
          switch (map.difficulty) {
          case RoadmapDifficultyEnum.BEGINNER: return 1;
          case RoadmapDifficultyEnum.JUNIOR: return 2;
          case RoadmapDifficultyEnum.MIDDLE: return 3;
          case RoadmapDifficultyEnum.SENIOR: return 4;
          }
        };

        return getWeight(mapB) - getWeight(mapA);
      });
    
    else if (filterBy === FilterBy.NEWEST)
      return maps.sort((mapA, mapB) => {
        return new Date(mapB.created_at).getTime() - new Date(mapA.created_at).getTime();
      });

    return maps;
  };

  return (
    <Container className='search-container'>
      <SortByComponent setFilterBy={setFilterBy}/>
      <SearchbarComponent setMaps={setMaps}/>
      <Container className='roadmap-list-container'>
        { 
          sortMaps().map((map, index) => 
            <RoadmapListItem
              key={index}
              myMaps={myMaps}
              setMyMaps={setMyMaps}
              roadmap={map}
            />
          )
        }
      </Container>
    </Container>
  );
};

export default Search;