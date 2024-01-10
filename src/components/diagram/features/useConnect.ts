import { useCallback } from 'react';
import { Connection, Edge, addEdge } from 'reactflow';

export default function useConnect (setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>) {
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, type: 'default' }, eds)),
    [ setEdges ]
  );

  return { onConnect };
}
