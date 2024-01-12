import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './styles/filterComponent.css';

interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const [ activeIndex, setActiveIndex ] = useState<number | null>(null);

  const toggleActiveButton = (index: number) => {
    setActiveIndex((prevIndex) => prevIndex === index ? null : index);
  };

  return (
    <Container className='filter-container'>
      <Row className="filter-btns">
        <span> Sort by: </span>
        {[ 'Rating', 'Popularity', 'Difficulty', 'Newest', 'Largest maps', 'Smallest maps' ].map((label, index) => 
          <button
            key={index}
            className={activeIndex === index ? 'filter-item active' : 'filter-item inactive'}
            onClick={() => toggleActiveButton(index)}
          >
            {label}
          </button>
        )}
      </Row>
    </Container>
  );
};

export default Filter;