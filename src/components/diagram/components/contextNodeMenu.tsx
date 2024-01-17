import React, { useState, useEffect, HTMLAttributes, Dispatch, SetStateAction } from 'react';
import { Edge, Node, useReactFlow } from 'reactflow';
import { useDuplicateNode, useSetNode, useDeleteNode, useUngroupChilds } from './contextMenuSettings';
import { DefaultNodeMenu } from './componentMenu/defaultNodeMenu';
import { SquareNodeMenu } from './componentMenu/squareNodeMenu';
import { Tab, Tabs } from 'react-bootstrap';
import { DataMenu } from './componentMenu/dataNodeMenu/dataMenu';
import './styles/contextMenu.css';
import { TextNodeMenu } from './componentMenu/textNodeMenu';

export interface ContextNodeMenuProps extends HTMLAttributes<any> {
  nodeId: string;
  setNodes: Dispatch<SetStateAction<Node[]>>
  setEdges: Dispatch<SetStateAction<Edge[]>>
}

export const ContextNodeMenu = ({
  nodeId,
  setNodes,
  setEdges,
  ...props
}: ContextNodeMenuProps) => {
  const { getNode } = useReactFlow();
  const [ node, setNode ] = useState(getNode(nodeId));
  const [ activeKey, setActiveKey ] = useState('component');

  const setNodeItem = useSetNode({
    node,
    setNode,
    setNodes,
  });

  const onDublicateNode = useDuplicateNode({
    node,
    setNodes,
  });

  const onDeleteNode = useDeleteNode({
    nodeId,
    setNodes,
    setEdges,
  });


  const onUngroupChilds = useUngroupChilds({
    nodeId,
    setNodes,
  });

  useEffect(() => {
    setActiveKey('component');
  }, [ nodeId ]);

  useEffect(() => {
    const foundNode = getNode(nodeId);
    setNode(foundNode);
  }, [ getNode(nodeId) ]);

  return (
    <div
      style={{ zIndex: 10 }}
      className="context-menu"
      {...props}
    >
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="tabs-controller"
        onSelect={(page) => setActiveKey(page ?? 'component')}
        activeKey={activeKey}
      >
        <Tab eventKey="component" title="Component">
          <div className="component-settings">
            <DefaultNodeMenu
              node={node} 
              setNodeItem={setNodeItem}
            />
            <SquareNodeMenu 
              node={node} 
              setNodeItem={setNodeItem}
            />

            <TextNodeMenu
              node={node} 
              setNodeItem={setNodeItem}
            />
          </div>
          <button className='dublicate-node-btn' onClick={onDublicateNode}>Duplicate</button>
          <button className='delete-node-btn' onClick={onUngroupChilds}>Ungroup</button>
          <button className='delete-node-btn' onClick={onDeleteNode}>Delete</button>          
        </Tab>

        { node?.type === 'textNode' 
          ? <></>
          : <Tab eventKey="data" title="Data">
            <DataMenu 
              node={node} 
              setNodeItem={setNodeItem}
            />
          </Tab> 
        }
      </Tabs>
    </div>
  );
};

export default ContextNodeMenu;