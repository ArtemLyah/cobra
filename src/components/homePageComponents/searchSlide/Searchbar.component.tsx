import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

import './styles/searchbarComponent.css';


const SearchbarComponent = () => {
  const ratingOptions = [ { value: '5⭐' }, { value: '4⭐' }, { value: '3⭐' }, { value: '2⭐' }, { value: '1⭐' } ];
  const difficultyOptions = [ { value: 'Beginner' }, { value: 'Junior' }, { value: 'Middle' }, { value: 'Senior' } ];
  
  return (
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
              onRemove={function noRefCheck () {}}
              onSearch={function noRefCheck () {}}
              onSelect={(e) => console.log(e) } // У консолі виводиться масив обраних значень
              options={difficultyOptions}
              // singleSelect={true}
              showCheckbox
            />
          </div>
        </div>

        <div className="input-container">
          <input type='text' className='search-input' placeholder='Enter the name of the map'></input>
          <button type='submit' className='icon' >
            <i className='fa-solid fa-magnifying-glass' ></i>
          </button>
        </div>
      </Row>
    </Container>
  );
};

export default SearchbarComponent;