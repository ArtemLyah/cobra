import React, { memo } from 'react';
import { Handle, Position, NodeResizer, Node } from 'reactflow';
import { AlignText, SquareNodeData, TextSize } from '../types/SquareNodeData';
import { NodeProps } from '../types/NodeProps';
import './styles/squareNode.css';
import useShiftPressed from './useShiftPressed';
import { CreateNodeArgs } from '../types/CreateNode';

const SquareNode = ({ data, selected }: NodeProps<SquareNodeData>) => {
  const shiftPressed = useShiftPressed();

  return (
    <>
      <NodeResizer 
        minWidth={100} 
        minHeight={40} 
        isVisible={selected}
        keepAspectRatio={shiftPressed}
      />
      <div>
        <p>{ data.label }</p>
      </div>

      <Handle 
        id='a' 
        type='source' 
        position={ Position.Top }
        isConnectable
      />
      <Handle 
        id='b' 
        type='source' 
        position={ Position.Right }
        isConnectable
      />
      <Handle 
        id='c' 
        type='source' 
        position={ Position.Bottom }
        isConnectable
      />
      <Handle 
        id='d' 
        type='source' 
        position={ Position.Left }
        isConnectable
      />
    </>
  );
};

export default memo(SquareNode);

export const createSquareNode = ({ id, position, ...props }: CreateNodeArgs): Node<SquareNodeData> => {
  return {
    ...props,
    id,
    type: 'squareNode',
    position,
    data: {
      label: 'squareNode',
      content: {
        topicTitle: '',
        markdownText: '',
      },
      settings: {
        alignText: AlignText.CC,
        textSize: TextSize.SMALL,
        color: '#ffffff',
        borderRadius: 5,
        transparancy: 255,
      },
    },
    style: { 
      zIndex: 1,
      fontSize: TextSize.SMALL,
    },
  };
};