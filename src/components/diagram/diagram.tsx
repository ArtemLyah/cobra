import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, { 
  ReactFlowProvider,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Background,
  ConnectionMode,
  PanOnScrollMode,
} from 'reactflow';

//default diagram
import { initialNodes, initialEdges } from './defaultDiagram/defaultDiagram';

//components
import Sidebar from './components/sidebar';
import ContextNodeMenu, { ContextNodeMenuProps } from './components/contextNodeMenu';
import UngroupMenu, { UngroupMenuProps } from './components/ungroupMenu';

//custom nodes and edges import
import SquareNode from './nodes/SquareNode';
import GroupNode from './nodes/GroupNode';
import TextNode from './nodes/TextNode';


//styles import
import 'reactflow/dist/style.css';
import './diagram.css';

//import features
import { useCopyPasteComponent } from './keyboardFeatures';
import useDyamicGroup from './features/useDynamicGroup';
import useEdgeUpdate from './features/useEdgeUpdate';
import { useNodeContextMenu, useEdgeContextMenu } from './features/useContextMenu';
import useDnd from './features/useDnd';
import useConnect from './features/useConnect';
import useUngroupMenu from './features/useUngroupMenu';
import usePaneClick from './features/usePaneClick';
import { ContextEdgeMenu, ContextEdgeMenuProps } from './components/contextEdgeMenu';

//declare all node types
const nodeTypes = {
  squareNode: SquareNode,
  groupNode: GroupNode,
  textNode: TextNode,
};

//declare all edge types
const edgeTypes = {

};

//default viewport
const defaultViewport = { x: 0, y: 0, zoom: 0.5 };


const DiagramFlow = () => {

  //refs
  const reactFlowWrapper = useRef(null);
  const reactFlowRef = useRef<HTMLInputElement>(null) ; 

  //states
  const [ nodes, setNodes, onNodesChange ] = useNodesState(initialNodes);
  const [ edges, setEdges, onEdgesChange ] = useEdgesState(initialEdges);
  const [ nodeMenu, setNodeMenu ] = useState<ContextNodeMenuProps | null>(null);
  const [ edgeMenu, setEdgeMenu ] = useState<ContextEdgeMenuProps | null>(null);
  const [ ungroupMenu, setUngroupMenu ] = useState<UngroupMenuProps | null>(null);
  const [ reactFlowInstance, setReactFlowInstance ] = useState<ReactFlowInstance | undefined>(undefined);
  const [ isOpen, setIsOpen ] = useState(true);


  //props
  const { onNodeDrag, onNodeDragStop } = useDyamicGroup(setNodes);
  const { onEdgeUpdateStart, onEdgeUpdate, onEdgeUpdateEnd } = useEdgeUpdate(setEdges);
  const { onNodeClick } = useNodeContextMenu(reactFlowRef, setNodeMenu, setNodes, setEdges, setEdgeMenu);
  const { onEdgeClick } = useEdgeContextMenu(reactFlowRef, setEdgeMenu, setEdges, setNodeMenu );
  const { onDragOver, onDrop } = useDnd(reactFlowInstance, setNodes);
  const { onConnect } = useConnect(setEdges);
  const { onNodeContextMenu } = useUngroupMenu(reactFlowRef, setUngroupMenu);
  const { onPaneClick } = usePaneClick(setNodeMenu, setEdgeMenu, setUngroupMenu );

  useCopyPasteComponent({
    nodes,
    edges,
    setNodes,
    setEdges,
  });


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
    <div className='flex-box'>
      <div style={{ position: 'absolute', marginLeft: `${ isOpen ? '0px' : '-260px' }`, transition: 'margin-left 0.3s', zIndex: 10 }} className='sidebar' >
        <Sidebar />
      </div> 
      <div className='hide-btn-wrap'>
        <button onClick={() => setIsOpen(!isOpen)} style={{ 
          color: '#d5d5d5',
          fontSize: '1.4em',
          background: '#1D1D2A',
          position: 'absolute',
          borderBottomRightRadius: '5px',
          borderTopRightRadius: '5px', 
          zIndex: 10, 
          left: `${ isOpen ? '257px' : '-2px' }`, 
          transition: '0.3s',
        }}>{ isOpen ? '<<' : '>>'}</button>
      </div>
      <div className='reactflow-wrapper' ref={reactFlowWrapper}>
        <ReactFlow 
          ref={reactFlowRef}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          defaultViewport={defaultViewport}
          fitView
          connectionMode={ConnectionMode.Loose}
          onDrop={(event) => onDrop(event, nodes)}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          selectNodesOnDrag={false}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          panOnScroll={true}
          panOnScrollMode={PanOnScrollMode.Free}
          zoomOnDoubleClick={true}
          style={{ background: '#d5d5d5' }}
        >
          <Controls style={{ position: 'absolute', left: `${ isOpen ? '260px' : '0px' }`, transition: '0.3s' }} />
          { nodeMenu && <ContextNodeMenu {...nodeMenu} /> }
          { edgeMenu && <ContextEdgeMenu {...edgeMenu} /> }
          { ungroupMenu && <UngroupMenu onClick={onPaneClick} {...ungroupMenu} /> }
          <Background offset={1.5} color='#1d1d2a' />
        </ReactFlow>
      </div>
    </div>
  );
};

export default function Diagram () {
  return (
    <ReactFlowProvider>
      <DiagramFlow />
    </ReactFlowProvider>
  );
}

