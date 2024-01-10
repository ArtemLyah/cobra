import React, { memo } from 'react';
import { Node, NodeResizer } from 'reactflow';
import { CreateNodeArgs } from '../types/CreateNode';
import { DefaultNodeDataWithContent } from '../types/DefaultNodeData';
import { NodeProps } from '../types/NodeProps';
import './styles/GroupNode.css';
import useShiftPressed from './useShiftPressed';

const GroupNode = ({ data, selected }: NodeProps<DefaultNodeDataWithContent>) => {
  const shiftPressed = useShiftPressed();

  return (
    <div style= {{ zIndex: -1 }}>
      <NodeResizer 
        minWidth={200} 
        minHeight={200} 
        isVisible={selected}
        keepAspectRatio={shiftPressed}
      />
      <div>
        <p>{data.label}</p>
      </div>
    </div>
  );
};

export default memo(GroupNode);

export const createGroupNode  = ({ id, position, ...props }: CreateNodeArgs): Node<DefaultNodeDataWithContent> => {
  return {
    ...props,
    id,
    type: 'groupNode',
    position,
    data: {
      content: {
        topicTitle: '',
        markdownText: '',
      },
      label: 'groupNode',
    },
    style: { zIndex: -1 },
  };
};