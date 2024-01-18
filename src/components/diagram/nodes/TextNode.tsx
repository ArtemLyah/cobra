import React, { memo } from 'react';
import { Node, NodeResizer } from 'reactflow';
import { CreateNodeArgs } from '../types/CreateNode';
import { DefaultNodeData } from '../types/DefaultNodeData';
import { NodeProps } from '../types/NodeProps';
import { TextNodeData } from '../types/TextNodeData';
import './styles/textNode.css';

const TextNode = ({ data, selected }: NodeProps<DefaultNodeData>) => {
  return (
    <>
      <NodeResizer 
        minWidth={100} 
        minHeight={30} 
        isVisible={selected}
      />
      <div>
        <p>{ data.label }</p>
      </div>
    </>
  );
};

export default memo(TextNode);

export const createTextNode  = ({ id, position, ...props }: CreateNodeArgs): Node<TextNodeData> => {
  return {
    ...props,
    id,
    type: 'textNode',
    position,
    data: {
      label: 'textNode',
      settings: {
        color: '#292724',
        textSize: 14,
      },
    },
    style: { 
      zIndex: 1,
      color: '#292724',
      fontSize: 14,
    },
  };
};