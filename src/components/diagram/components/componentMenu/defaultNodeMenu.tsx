import React, { useState } from 'react';
import { Node } from 'reactflow';
import { DefaultNodeData } from '../../types/DefaultNodeData';
import { SetNodeFunc } from '../contextMenuSettings';
import '../styles/defaultSettingsMenu.css';

export interface DefaultMenuProps<D extends DefaultNodeData<S>=DefaultNodeData, S=any> {
  node: Node<D> | undefined;
  setNodeItem: SetNodeFunc<D>;
}

export const DefaultNodeMenu = ({
  node,
  setNodeItem,
}: DefaultMenuProps) => {
  

  return ( 
    <div className='default-settings'>
      <div className="default-settings-block">
        <p className='node-number'>
          {node?.type ?? 'node'}: { node?.id }
        </p>
      </div>
      <div className='default-settings-grid'>
        <div className='default-settings-item'>
          <p>x</p>
          <p>{Math.round(node?.position.x ?? 0)}</p>
        </div>

        <div className='default-settings-item'>
          <p>y</p>
          <p>{Math.round(node?.position.y ?? 0)}</p>
        </div>

        <div className='default-settings-item'>
          <p>w</p>
          <p>{node?.width}</p>
        </div>
        <div className='default-settings-item'>
          <p>h</p>
          <p>{node?.height}</p>
        </div>
      </div>
      <div className="default-settings-block">
        <label>Label</label>
        <input type="text" value={node?.data.label} onChange={(event) => {
          setNodeItem({
            data: {
              label: event.target.value,
            },
          });
        }}/>
      </div>
      <hr/>
    </div>
  );
};
 