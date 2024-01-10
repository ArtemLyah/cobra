import React from 'react';
import { DataContent, DefaultNodeDataWithContent } from '../../../types/DefaultNodeData';
import { SetNodeFunc } from '../../contextMenuSettings';

interface InputDataSideProps {
  content: DataContent;
  setNodeItem: SetNodeFunc<DefaultNodeDataWithContent>;
}

const InputDataSide = ({
  content,
  setNodeItem,
}: InputDataSideProps) => {
  return ( 
    <div className="input-data-side">
      <div className="title-block">
        <input 
          type="text" 
          placeholder='Name of topic'
          value={content.topicTitle}
          onChange={(event) => 
            setNodeItem({
              data: {
                content: {
                  topicTitle: event.target.value,
                  markdownText: content.markdownText,
                },
              },
            })
          }
        />
      </div>

      <textarea 
        className="content-block"
        cols={30} 
        rows={20} 
        placeholder='Main text in markdown'
        value={content.markdownText}
        onChange={(event) =>
          setNodeItem({
            data: {
              content: {
                topicTitle: content.topicTitle,
                markdownText: event.target.value,
              },
            },
          })
        }
      />
    </div>
  );
};
 
export default InputDataSide;