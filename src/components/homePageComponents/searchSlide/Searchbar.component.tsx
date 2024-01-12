import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

import './styles/searchbarComponent.css';


const SearchbarComponent = () => {
  const ratingOptions = [ { value: '5⭐' }, { value: '4⭐' }, { value: '3⭐' }, { value: '2⭐' }, { value: '1⭐' } ];
  const difficultyOptions = [ { value: 'Beginner' }, { value: 'Junior' }, { value: 'Middle' }, { value: 'Senior' } ];
  const topicOptions = [ { value: 'Program language' }, { value: 'Technology' }, { value: 'Framework' }, { value: 'Profession' } ];
  const tagOptions = [ { value: 'One' }, { value: 'Two' }, { value: 'Three' } ];
  
  return (
    <Container className="search-component-container">
      <Row> 
        <div className='select-container'>
          <div className='select-box'>
            <Multiselect
              placeholder='Rating ▼'
              displayValue="value"
              hideSelectedList
              onKeyPressFn={function noRefCheck () {}}
              onRemove={function noRefCheck () {}}
              onSearch={function noRefCheck () {}}
              onSelect={(e) => console.log(e) } // <=== У консолі виводиться масив обраних значень
              options={ratingOptions}
              showCheckbox
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
              showCheckbox
            />
          </div>
        </div>

        <div className='select-container'>
          <div className='select-box'>
            <Multiselect
              placeholder='Topic ▼'
              displayValue="value"
              hideSelectedList
              onKeyPressFn={function noRefCheck () {}}
              onRemove={function noRefCheck () {}}
              onSearch={function noRefCheck () {}}
              onSelect={(e) => console.log(e) } // У консолі виводиться масив обраних значень
              options={topicOptions}
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