import React, { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './styles/filterComponent.css';

interface FilterProps {
  setFilterBy: Dispatch<SetStateAction<number | null>>,
}

const SortByComponent = ({ setFilterBy }: FilterProps) => {
  const [ activeIndex, setActiveIndex ] = useState<number | null>(null);

  const toggleActiveButton = (event: MouseEvent, index: number) => {
    event.preventDefault();
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;
      setFilterBy(newIndex);
      return newIndex;
    });
  };

  return (
    <Container className='filter-container'>
      <Row className="filter-btns">
        <span> Sort by: </span>
        {[ 'Rating', 'Popularity', 'Difficulty', 'Newest' ].map((label, index) => 
          <button
            key={index}
            className={activeIndex === index ? 'filter-item active' : 'filter-item inactive'}
            onClick={(event) => toggleActiveButton(event, index)}
          >
            {label}
          </button>
        )}
      </Row>
    </Container>
  );
};

export default SortByComponent;