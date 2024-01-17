import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Node, Edge } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

interface CopyPasteProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}

export const useCopyPasteComponent = ({ nodes, edges, setNodes, setEdges }: CopyPasteProps) => {
  const [ ctrlPressed, setCtrlPressed ] = useState(false);

  const [ copyPressed, setCopyPressed ] = useState(false);
  const [ pastePressed, setPastePressed ] = useState(false);

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Control') {
      setCtrlPressed(true);
    } else if (ev.key === 'c') {
      if (ctrlPressed) setCopyPressed(true);

    } else if (ev.key === 'v') {
      if (ctrlPressed) setPastePressed(true);
      setCopyPressed(false);
    }
  };

  const handleKeyUp = (ev: KeyboardEvent) => {
    if (ev.key === 'Control') {
      setCtrlPressed(false);
      setCopyPressed(false);
      setPastePressed(false);
    } else if (ev.key === 'c') {
      setCopyPressed(false);
    } else if (ev.key === 'v') {
      setPastePressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  useEffect(() => {
    if (copyPressed && document.activeElement?.tagName === 'DIV') {
      console.log(nodes);
      const copyNodes = nodes.filter((node) => node.selected);
      const copyEdges = edges.filter((edge) => edge.selected);
      navigator.clipboard.writeText(JSON.stringify({
        copyNodes,
        copyEdges,
      }));
    } else if (pastePressed) {
      navigator.clipboard.readText().then((value: string) => {
        let copyObject: {
          copyNodes: Node[];
          copyEdges: Edge[];
        };
        try {
          copyObject = JSON.parse(value);
        } catch {
          return;
        }
        const copyNodes = copyObject.copyNodes;
        const copyEdges = copyObject.copyEdges;
        const mapNodes = new Map();

        console.log('nodes', copyNodes);
        console.log('edges', copyEdges);
        
        let newNodes = copyNodes.map((node) => {
          const newNodeId = uuidv4() as string;
          mapNodes[node.id] = newNodeId;
          return {
            ...node,
            id: newNodeId,
            position: {
              x: node.position.x + 10,
              y: node.position.y + 10,
            },
          };
        });

        console.log(copyNodes);
        console.log(newNodes);

        const newEdges = copyEdges.map((edge) => {
          edge.source = mapNodes[edge.source] ?? edge.source;
          edge.target = mapNodes[edge.target] ?? edge.target;     
          return {
            ...edge,
            id: `${edge.source}-${edge.target}`,
          };
        });

        newNodes = newNodes.map((node) => {
          return {
            ...node,
            parentNode: mapNodes[node.parentNode ?? ''] ?? node.parentNode,
          };
        });

        setNodes((nodes) => {
          return nodes.map((node) => {
            if (copyNodes.find((copyNode) => copyNode.id === node.id)) {
              return {
                ...node,
                selected: false,
              };
            }
            return node;
          }).concat(newNodes);
        });

        setEdges((edges) => {
          return edges.map((edge) => {
            if (copyEdges.find((copyEdge) => copyEdge.id === edge.id)) {
              return {
                ...edge,
                selected: false,
              };
            }
            return edge;
          }).concat(newEdges);
        });

        navigator.clipboard.writeText(JSON.stringify({
          copyNodes: newNodes,
          copyEdges: newEdges,
        }));
      });
    }
  }, [ copyPressed, pastePressed ]);
};