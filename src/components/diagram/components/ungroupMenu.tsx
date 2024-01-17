import React, { useCallback, HTMLAttributes, useState, useEffect } from 'react';
import { useReactFlow, Node } from 'reactflow';

import './styles/ungroupMenu.css';

export interface UngroupMenuProps extends HTMLAttributes<any> {
  node: Node;
  top: any;
  left: any;
  right: any;
  bottom: any;
}

export default function UngroupMenu ({
  node,
  top,
  left,
  right,
  bottom,
  ...props
}: UngroupMenuProps) {
  
  const { setNodes, getNode } = useReactFlow();
  const [ hasParent, setHasParent ] = useState(false);

  useEffect(() => {
    if (node.parentNode && node.parentNode.trim() !== '') {
      setHasParent(true);
    } else {
      setHasParent(false);
    }
  }, [ node ]);

  const Ungroup = useCallback(() => {
    if (node.parentNode ?? false) {
      const Group = getNode(node.parentNode ?? '');
      if (!Group) return;

      setNodes((nodes) => {
        return nodes.map((nd) => {
          return {
            ...nd,
            parentNode: nd.id == node.id && nd.parentNode == Group.id  ? undefined : nd.parentNode,
            position: nd.id == node.id ? { x: Group.position.x - 50, y: Group.position.y - 50 } : nd.position,
          };
        });
      });
    }
  }, [ setNodes ]);
    
  return (
    <div
      style={{ display: `${ hasParent ? 'block' : 'none' }`, top, left, right, bottom }}
      className="ungroup-menu"
      {...props}
    >
      <button onClick={Ungroup}>Ungroup</button>
    </div>
  );
}