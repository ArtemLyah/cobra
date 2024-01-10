import { useCallback, DragEvent } from 'react';
import { XYPosition, Node, ReactFlowInstance } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { createGroupNode } from '../nodes/GroupNode';
import { createSquareNode } from '../nodes/SquareNode';
import { createTextNode } from '../nodes/TextNode';
import { CreateNodeWithTypeArgs } from '../types/CreateNode';
import { DefaultNodeData } from '../types/DefaultNodeData';

const createNode = (nodeArgs: CreateNodeWithTypeArgs): Node => {
  if (nodeArgs.type === 'squareNode') return createSquareNode(nodeArgs);
  if (nodeArgs.type === 'groupNode') return createGroupNode(nodeArgs);
  if (nodeArgs.type === 'textNode') return createTextNode(nodeArgs);
  return {
    ...nodeArgs,
    data: {
      label: nodeArgs.type,
    },
  } as Node<DefaultNodeData>;
};

export default function useDnd (
  reactFlowInstance:  ReactFlowInstance<any, any> | undefined,
  setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>
) {

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event: DragEvent, nodes: Node<any, string | undefined>[]) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position: XYPosition = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) ?? { x: 10, y: 10 };

      const newNode = createNode({
        id: uuidv4(),
        type,
        position,
      });
      
      setNodes((nds) => nds.concat(newNode));
    },
    [ reactFlowInstance ]
  );

  return { onDragOver, onDrop };
}

