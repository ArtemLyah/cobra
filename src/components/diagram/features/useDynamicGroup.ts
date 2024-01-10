import { useCallback, MouseEvent as ReactMouseEvent } from 'react';

import { useReactFlow, Node, NodeDragHandler } from 'reactflow';



export default function useDynamicGroup (setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>) {

  const { getIntersectingNodes } = useReactFlow();

  const onNodeDrag: NodeDragHandler =  
    useCallback((_: ReactMouseEvent, node: Node) => {
      const intersections: string[] = getIntersectingNodes(node, false)
        .filter((ns) => ns.type == 'groupNode')
        .map((n) => n.id);
    
      setNodes((ns) =>
        ns.map((n) => ({
          ...n,
          className: intersections.includes(n.id) ? 'highlight' : '',
        }))
      );
    }, []); 
  
  const onNodeDragStop: NodeDragHandler = 
    useCallback((mouse: ReactMouseEvent, node: Node) => {
      const intersections: Node[] = getIntersectingNodes(node, false)
        .filter((ns) => ns.type == 'groupNode');
      if (intersections.length === 0 || node.parentNode)  return;
      const parent: Node = intersections[0];
      setNodes((nodes) => {
        return nodes.map((nd) => {
          if (nd.id === parent.id) return {
            ...nd,
            className: '',
          };
          if (nd.id !== node.id) return nd;
          return {
            ...nd,
            position: { x: node.position.x - parent.position.x, y: node.position.y - parent.position.y },
            parentNode:parent.id,
          };
        });
      });
    }, []);

  return { onNodeDrag, onNodeDragStop };
}