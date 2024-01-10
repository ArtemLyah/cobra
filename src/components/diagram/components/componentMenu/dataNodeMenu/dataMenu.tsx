import React, { useState } from 'react';
import { DefaultMenuProps } from '../defaultNodeMenu';
import InputDataSide from './inputDataSide';
import ResultDataSide from './resultDataSide';
import '../../styles/dataMenu.css';
import { DefaultNodeDataWithContent } from '../../../types/DefaultNodeData';

export const DataMenu = ({
  node,
  setNodeItem,
}: DefaultMenuProps<DefaultNodeDataWithContent>) => {
  const [ preview, setPreview ] = useState(false);
  
  if (!node) return <></>;

  const content = node.data.content;

  return (
    <div className="data-settings">
      { 
        preview 
          ? <ResultDataSide topicName={content.topicTitle} markdownText={content.markdownText}/>
          : <InputDataSide 
            content={content} 
            setNodeItem={setNodeItem}
          />
      }
      
      <button 
        type="button" 
        className='data-menu-btn preview-btn' 
        name='preview'
        onClick={() => setPreview(!preview)}
      >{preview ? 'Back' : 'Preview'}</button>
    </div>
  );
};