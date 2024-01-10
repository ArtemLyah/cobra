import { Dispatch, SetStateAction, useCallback } from 'react';
import { DeepPartial } from 'react-hook-form';
import { Node, useReactFlow, Edge } from 'reactflow';
import { DefaultEdgeData } from '../types/DefaultEdgeData';
import { DefaultNodeData } from '../types/DefaultNodeData';

interface UseSetNodeArgs<D=DefaultNodeData> {
  node: Node<D> | undefined,
  setNode: Dispatch<SetStateAction<Node<D> | undefined>>,
  setNodes: React.Dispatch<React.SetStateAction<Node<D>[]>>,
}

export type SetNodeFunc<D extends DefaultNodeData<S>=DefaultNodeData, S=any> = (newNode: Partial<Node<DeepPartial<D>>>) => void; 

export const useSetNode = <D extends DefaultNodeData<S>=DefaultNodeData, S=any>({
  node,
  setNode,
  setNodes,
}: UseSetNodeArgs<D>): SetNodeFunc<D> => {
  return (newNode: Partial<Node<DeepPartial<D>>>) => {
    if (!node) return;
    setNode({
      ...node,
      ...newNode,
      position: {
        ...node.position,
        ...newNode.position,
      },
      style: {
        ...node.style,
        ...newNode.style,
      },
      data: {
        ...node.data,
        ...newNode.data,
        settings: {
          ...node.data.settings,
          ...newNode.data?.settings,
        },
      },
    });
    setNodes((nodes) => {
      return nodes.map((nd) => {
        if (nd.id !== node.id) return nd;
        return {
          ...nd,
          ...newNode,
          position: {
            ...nd.position,
            ...newNode.position,
          },
          style: {
            ...nd.style,
            ...newNode.style,
          },
          data: {
            ...nd.data,
            ...newNode.data,
            settings: {
              ...nd.data?.settings,
              ...newNode.data?.settings,
            },
          },
        };
      });
    });
  };
};

interface UseSetEdge<D=DefaultEdgeData> {
  edge: Edge<D> | undefined;
  setEdge: Dispatch<SetStateAction<Edge<any> | undefined>>
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>,
}

export type SetEdgeFunc<D extends DefaultEdgeData<S>=DefaultEdgeData, S=any> = (newEdge: Partial<Edge<DeepPartial<D>>>) => void; 

export const useSetEdge = <D extends DefaultEdgeData<S>=DefaultEdgeData, S=any>({
  edge,
  setEdge,
  setEdges,
}: UseSetEdge<D>): SetEdgeFunc<D> => {
  return (newEdge: Partial<Edge<DeepPartial<D>>>) => {
    if (!edge) return;
    setEdge({
      ...edge,
      ...newEdge,
      data: {
        ...edge.data,
        ...newEdge.data,
        settings: {
          ...edge.data?.settings,
          ...newEdge.data?.settings,
        },
      },
      style: {
        ...edge.style,
        ...newEdge.style,
      },
    });
    setEdges((edges) => {
      return edges.map((ed) => {
        if (ed.id !== edge.id) return ed;
        return {
          ...edge,
          ...newEdge,
          data: {
            ...edge.data,
            ...newEdge.data,
            settings: {
              ...edge.data?.settings,
              ...newEdge.data?.settings,
            },
          },
          style: {
            ...edge.style,
            ...newEdge.style,
          },
        };
      });
    });
  };
};

interface DublicateNodeArgs {
  node: Node | undefined;
  setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
}

export const useDuplicateNode = ({ node, setNodes }: DublicateNodeArgs) => {
  return useCallback(() => {
    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      setNodes((nodes) => {
        const lastId = nodes.at(-1)?.id ?? '0';

        return nodes.concat({ 
          ...node, 
          id: (+lastId+1).toString(), 
          position, 
          selected: false,
        });
      });
    }
  }, [ node ]);
}; 


// interface UngroupArgs {
//   nodeId: string;
//   setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
// }

// export const useUngroupParent = ({
//   nodeId,
//   setNodes,
// }: UngroupArgs) => {
//   const { getNode } = useReactFlow();
//   const node = getNode(nodeId);
//   if (!node) return;
  

//   return useCallback(() => { 
//     setNodes((nodes) => {
//       return nodes.map((nd) => {
//         return {
//           ...nd,
//           parentNode: nd.id === nodeId ? '' : nd.parentNode,
//           position: { x: (parent?.position.x ?? 0) - 20, y: (parent?.position.y ?? 0) - 20 },
//         };
//       });
//     });
  
//   }, [ nodeId, setNodes ] );
// };

interface DeleteNodeArgs {
  nodeId: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

export const useDeleteNode = ({
  nodeId,
  setNodes,
  setEdges,
}: DeleteNodeArgs) => {
  const { getNode, getNodes } = useReactFlow();
  const node = getNode(nodeId);
  const child_nodes = getNodes().filter((n) => n.parentNode === nodeId).map((n) => n.id);

  return useCallback(() => {

    setNodes((nodes) => {
      return nodes.map((nd, index) => {
        return {
          ...nd,
          parentNode: child_nodes.includes(nd.id) ? undefined : nd.parentNode,
          position:  node ? { x: node.position.x-10*index, y: node.position.y-10*index } : nd.position,
        };
      });
    });
    
    setNodes((nodes) => nodes.filter((n) => n.id !== nodeId));
    setEdges((edges) => edges.filter((edge) => edge.source !== nodeId));
    
  }, [ nodeId, setNodes, setEdges ]);
};

interface UngroupChildsArgs {
  nodeId: string;
  setNodes: React.Dispatch<React.SetStateAction<Node<any, string | undefined>[]>>;
}

export const useUngroupChilds = ({
  nodeId,
  setNodes,
}: UngroupChildsArgs) => {
  const { getNode, getNodes } = useReactFlow();
  const node = getNode(nodeId);
  const child_nodes = getNodes().filter((n) => n.parentNode === nodeId).map((n) => n.id);


  return useCallback(() => {
    setNodes((nodes) => {
      return nodes.map((nd, index) => {
        return {
          ...nd,
          parentNode: child_nodes.includes(nd.id) ? undefined : nd.parentNode,
          position:  node ? { x: node.position.x-10*index, y: node.position.y-10*index } : nd.position,
        };
      });
    });
      
    

  }, [ nodeId, setNodes ]);
};