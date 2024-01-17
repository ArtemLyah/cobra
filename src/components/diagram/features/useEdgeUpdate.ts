import { useCallback, useRef } from 'react';
import { Edge, Connection, updateEdge } from 'reactflow';

// edgeUpdateSuccessful React.MutableRefObject<boolean>
export default function useEdgeUpdate (setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {
  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  
  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);
  
  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  
    edgeUpdateSuccessful.current = true;
  }, []);

  return { onEdgeUpdateStart, onEdgeUpdate, onEdgeUpdateEnd };
}


