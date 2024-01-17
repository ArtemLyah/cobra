import React, { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';
import ReactFlow, { 
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  Edge,
  ConnectionMode,
} from 'reactflow';


//components
import ContextMenu, { NodeMenuProps } from './contextMenu';

//custom nodes and edges import
import SquareNode from '../nodes/SquareNode';
import GroupNode from '../nodes/GroupNode';
import TextNode from '../nodes/TextNode';


//styles import
import 'reactflow/dist/style.css';
import '../diagram.css';
import '../components/styles/squareSettingsMenu.css';
import '../components/styles/dataMenu.css';

//declare all node types
const nodeTypes = {
  squareNode: SquareNode,
  groupNode: GroupNode,
  textNode: TextNode,
};

//import map

//default viewport
const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

interface Structure{
  nodes: Node[],
  edges: Edge[]
}

const Flow = ({ nodes, edges }: Structure) => {

  //refs
  const reactFlowRef = useRef<HTMLInputElement>(null) ; 

  //states
  
  const [ nodeMenu, setNodeMenu ] = useState<NodeMenuProps | null>(null);
  
  const onNodeClick = useCallback(
    (event: MouseEvent, node: Node) => {
      event.preventDefault();
      if (reactFlowRef.current) {
        setNodeMenu({
          node,
        });
      }
    },
    [ setNodeMenu ]
  );

  const onPaneClick = useCallback(() => {
    setNodeMenu(null);
  }, [ setNodeMenu ]);
  
  useEffect(() => {
    const errorHandler = (error: any)  => {
      if (
        error.message.includes(
          'ResizeObserver loop completed with undelivered notifications' ||
            'ResizeObserver loop limit exceeded'
        )
      ) {
        console.log(error.message);
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.style.display = 'none';
        }
      }
    };
    window.addEventListener('error', errorHandler);
  
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <div style={{ 
      width: '90vw',
      height: '95vh',
      border: '5px solid #75D04A',
      borderRadius: '10px',
    }}>
      <ReactFlow 
        style={{ background: '#d5d5d5' }}
        connectionMode={ConnectionMode.Loose}
        disableKeyboardA11y={true}
        ref={reactFlowRef}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        defaultViewport={defaultViewport}
        fitView
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        zoomOnDoubleClick={true}
        nodesDraggable={false}
        nodesConnectable={false}
        //elementsSelectable={false}
        connectOnClick={false}
      >
        <Controls/>
        { nodeMenu && <ContextMenu {...nodeMenu} /> }
        <Background color='#1d1d2a' />
      </ReactFlow>
    </div>
  );
};

export default function DiagramRead ({ nodes, edges }: Structure) {
  return (
    <ReactFlowProvider>
      <Flow nodes={nodes} edges={edges} />
    </ReactFlowProvider>
  );
}

