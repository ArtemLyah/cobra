import { useCallback, MouseEvent, Dispatch, RefObject, SetStateAction } from 'react';
import { Edge, Node } from 'reactflow';
import { ContextEdgeMenuProps } from '../components/contextEdgeMenu';
import { ContextNodeMenuProps } from '../components/contextNodeMenu';


export function useNodeContextMenu (
  reactFlowRef: RefObject<HTMLInputElement>, 
  setNodeMenu: Dispatch<SetStateAction<ContextNodeMenuProps | null>>,
  setNodes: Dispatch<SetStateAction<Node[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setEdgeMenu: Dispatch<SetStateAction<ContextEdgeMenuProps | null>>

) {
  const onNodeClick = useCallback(
    (event: MouseEvent, node: Node) => {
      event.preventDefault();
      setEdgeMenu(null);

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      if (reactFlowRef.current) {
        setNodeMenu({
          nodeId: node.id,
          setNodes,
          setEdges,
        });
      }
    },
    [ setNodeMenu ]
  );
  
  
  return { onNodeClick };
}

export function useEdgeContextMenu (
  reactFlowRef: RefObject<HTMLInputElement>, 
  setEdgeMenu: Dispatch<SetStateAction<ContextEdgeMenuProps | null>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setNodeMenu: Dispatch<SetStateAction<ContextNodeMenuProps | null>>

) {

  const onEdgeClick = useCallback(
    (event: MouseEvent, edge: Edge) => {
      event.preventDefault();
      setNodeMenu(null);

      if (reactFlowRef.current) {
        setEdgeMenu({
          edgeId: edge.id,
          setEdges,
        });
      }
    },
    [ setEdgeMenu ]
  );

  return { onEdgeClick };


}