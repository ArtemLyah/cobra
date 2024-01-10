import React, { useState, ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { useReactFlow } from 'reactflow';
import { FullRoadmapResponse } from '../../../api/responses/fullRoadmap.response';
import { roadmapService } from '../../../api/services/roadmap.service';
import { RoadmapDifficultyEnum } from '../../../api/types/roadmapDifficulty.type';
import useCookie from '../../../hooks/useCookie';

import './styles/sidebar.css';

export const Sidebar = () => {
  const [ inputValue, setInputValue ] = useState<string>('#');
  const [ isMinimized, setIsMinimized ] = useState<boolean>(false);
  
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ difficulty, setDifficulty ] = useState<RoadmapDifficultyEnum | undefined>();
  const [ tags, setTags ] = useState<string[]>([]);
  
  const { getEdges, getNodes } = useReactFlow();
  const { token } = useCookie();
  const navigate = useNavigate(); 

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const sliced: string = value.slice(value.lastIndexOf('#') + 1, -1);

    if (!value.startsWith(' ') && value.length <= 19 && !value.includes('  ') && !value.includes('##')) {
      if (value.includes('#')
      && /\s$/.test(value)
      && sliced.length > 1
      && !tags.includes(sliced)
      ) {
        const tag: string = value.slice(value.lastIndexOf('#') + 1, -1);
        setTags([ ...tags, tag ]);
        setInputValue('#'); 
      } else {
        setInputValue(value);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleTagDelete = (index: number) => {
    const newTags = [ ...tags ];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSaveRoadmap = async () => {
    if (
      title.length === 0 ||
      description.length === 0 ||
      !difficulty 
    ) return;

    const nodes = getNodes();
    const edges = getEdges();

    await roadmapService.createWithMap(token, {
      title,
      description,
      difficulty,
      tags,
      structure: {
        nodes,
        edges,
      },
    }).then((result: FullRoadmapResponse) => {
      console.log(result);
      navigate(`/roadmaps/${result.id}`);
    });
  };

  const tagsToDisplay = isMinimized ? tags.slice(0, 3) : tags;

  return (
    <aside>
      <div className='form'>
        <form onKeyPress={handleKeyPress}>
          <div className='text'>
            <div className='map-title'>
              <input 
                type='text' 
                placeholder='Enter Title' 
                onChange={(event) => setTitle(event.target.value)}
              /> 
            </div>
            <div className='description'>
              <textarea 
                style={{ display: 'block' }}  
                placeholder='Enter Description' 
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className='difficulty'>
              <label htmlFor="difficulty-beginner">Beginner</label>
              <input 
                key="difficulty-1"
                id="difficulty-beginner" 
                type="radio" 
                name="difficulty" 
                onChange={() => setDifficulty(RoadmapDifficultyEnum.BEGINNER)}
              />
              
              <label htmlFor="difficulty-junior">Junior</label>
              <input 
                key="difficulty-2"
                id="difficulty-junior"
                type="radio" 
                name="difficulty" 
                onChange={() => setDifficulty(RoadmapDifficultyEnum.JUNIOR)}
              />
              
              <label htmlFor="difficulty-middle">Middle</label>
              <input 
                key="difficulty-3"
                id="difficulty-middle"
                type="radio" 
                name="difficulty" 
                onChange={() => setDifficulty(RoadmapDifficultyEnum.MIDDLE)}
              />
              
              <label htmlFor="difficulty-senior">Senior</label>
              <input 
                key="difficulty-4"
                id="difficulty-senior"
                type="radio" 
                name="difficulty" 
                onChange={() => setDifficulty(RoadmapDifficultyEnum.SENIOR)}
              />
            </div>
          </div>
          <div className='dnd-wrap'>
            <div className="dndnode square" onDragStart={(event) => onDragStart(event, 'squareNode')} draggable>
              Topic Node
            </div>
            <div className="dndnode group" onDragStart={(event) => onDragStart(event, 'groupNode')} draggable>
              Group Node
            </div>
            <div className="dndnode text" onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
              Text
            </div>
          </div>
          <div className='tags'>
            <div>
              <input
                type="text"
                placeholder="Enter tags using # (e.g., #tag1 #tag2)"
                value={inputValue}
                onChange={handleInputChange}
              >
              </input>
            </div>
            <div className='tag-group' style={{ display: 'inline', margin: '1px', marginLeft: '5px', maxWidth: '95%' }}>
              {tagsToDisplay.map((tag, index) => 
                <span key={index} className="tag" style={{ position: 'relative', margin: '12px', marginTop: '20px', marginBottom: '20px' }}>
                  {tag}
                  <button
                    className='close-tag'
                    type='button'
                    onClick={() => handleTagDelete(index)}
                  ><span style={{ position: 'absolute', right: '2.5px', top: '-5.5px' }}>x</span></button>
                </span>
              )}
              <span style={{ display: `${ isMinimized && tags.length > 2  ? 'block' : 'none' }` }}>...</span>
            </div>
            <button style={{ display: `${ tags.length > 3 ? 'block' : 'none' }` }} type='button' onClick={handleMinimizeToggle}>
              {isMinimized ? 'Maximize' : 'Minimize'}
            </button>
          </div>
          <div className='btn'>
            <button type='button' onClick={handleSaveRoadmap}>Save Roadmap</button>
          </div>
          <div className='btn'>
            <button type='button' onClick={() => navigate('/')}>Back</button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;