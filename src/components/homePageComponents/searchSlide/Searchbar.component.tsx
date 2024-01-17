import React, { useState, useEffect, FormEvent, SetStateAction, Dispatch } from 'react';
import { Container, Row } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';
import { roadmapService } from '../../../api/services/roadmap.service';
import { useCookie } from '../../../hooks/useCookie';
import { RoadmapShortResponse } from '../../../api/responses/roadmapShort.response';
import { RoadmapsFilter } from '../../../api/types/roadmapsFilter.type';
import { RoadmapDifficultyEnum } from '../../../api/types/roadmapDifficulty.type';

import './styles/searchbarComponent.css';
import './styles/roadmapList.css';

interface SearchbarProps {
  setMaps: Dispatch<SetStateAction<RoadmapShortResponse[]>>,
}

const SearchbarComponent = ({ setMaps }: SearchbarProps) => {
  const ratingOptions = [ { value: '5⭐' }, { value: '4⭐' }, { value: '3⭐' }, { value: '2⭐' }, { value: '1⭐' } ];
  const difficultyOptions = [ { value: 'Beginner' }, { value: 'Junior' }, { value: 'Middle' }, { value: 'Senior' } ];
  const { token } = useCookie();
  const [ filter, setFilter ] = useState('');
  const [ difficulty, setDifficulty ] = useState<RoadmapDifficultyEnum[]>([]);

  const getMaps = async (filter: string, difficulty: RoadmapDifficultyEnum[]) => {
    const Filter: RoadmapsFilter = {
      name: filter,
      difficulty: difficulty.length ? difficulty : undefined,
    };
    await roadmapService.getAll(token, Filter)
      .then((res: RoadmapShortResponse[]) => {
        setMaps(res);
      })
      .catch((e) => console.log(e));
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    getMaps(filter, difficulty);
  };

  const toDifficulty = (value: string) => {
    switch (value) {
    case 'Beginner':
      return RoadmapDifficultyEnum.BEGINNER;
      break;
    case 'Junior':
      return RoadmapDifficultyEnum.JUNIOR;
      break;
    case 'Middle':
      return RoadmapDifficultyEnum.MIDDLE;
      break;
    case 'Senior':
      return RoadmapDifficultyEnum.SENIOR;
      break;
    }
  };

  const handleChangeDifficulty = (e) => {
    setDifficulty(e.map((dif) => toDifficulty(dif.value)));
  };

  return (
    <>
      <Container className="search-component-container">
        <Row> 
          <div className='select-container'>
            <div className='select-box'>
              <Multiselect
                placeholder='Rating'
                displayValue="value"
                // hideSelectedList
                onKeyPressFn={function noRefCheck () {}}
                onRemove={function noRefCheck () {}}
                onSearch={function noRefCheck () {}}
                onSelect={(e) => console.log(e) } // <=== У консолі виводиться масив обраних значень
                options={ratingOptions}
                // showCheckbox
                singleSelect={true}
                customArrow={ '▼' }
              />
            </div>
          </div>

          <div className='select-container'>
            <div className='select-box'>
              <Multiselect
                placeholder='Difficulty ▼'
                displayValue="value"
                hideSelectedList
                onKeyPressFn={function noRefCheck () {}}
                onRemove={handleChangeDifficulty}
                onSearch={function noRefCheck () {}}
                onSelect={handleChangeDifficulty} // У консолі виводиться масив обраних значень
                options={difficultyOptions}
                // singleSelect={true}
                showCheckbox
              />
            </div>
          </div>

          <form className="input-container" onSubmit={handleSearch}>
            <input type='text' className='search-input' placeholder='Enter the name of the map' onChange={(e)=>setFilter(e.target.value)}></input>
            <button type='button' className='icon' onClick={handleSearch}>
              <i className='fa-solid fa-magnifying-glass' ></i>
            </button>
          </form>
        </Row>
      </Container>
    </>
  );
};

export default SearchbarComponent;