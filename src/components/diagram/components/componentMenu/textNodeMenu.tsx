import React from 'react';
import { DefaultMenuProps } from './defaultNodeMenu';
import { TextNodeData } from '../../types/TextNodeData';
import '../styles/squareSettingsMenu.css';

export const TextNodeMenu = ({
  node,
  setNodeItem,
}: DefaultMenuProps<TextNodeData>) => {
  if (node?.type !== 'textNode') return <></>;

  const settings = node.data.settings;

  return (
    <div className="default-settings">
      <div className="default-settings-block">
        <label>Color</label>
        <input 
          type="color" 
          value={settings.color}
          onChange={(event) => {
            setNodeItem({
              style: {
                color: event.target.value,
              },
              data: {
                settings: {
                  color: event.target.value,
                },
              },
            });
          }}
        />
      </div>
      
      <div className="default-settings-block">
        <label>Size</label>
        <input 
          type="number" 
          value={settings.textSize}
          onChange={(event) => {
            setNodeItem({
              style: {
                fontSize: +event.target.value,
              },
              data: {
                settings: {
                  textSize: +event.target.value,
                },
              },
            });
          }}
        />
      </div>
      <hr/>
    </div>
  );
};