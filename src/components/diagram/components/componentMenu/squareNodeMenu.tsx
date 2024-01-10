import React, { ReactElement } from 'react';
import { DefaultMenuProps } from './defaultNodeMenu';
import '../styles/squareSettingsMenu.css';
import { SquareNodeData, SquareNodeSettings, TextSize } from '../../types/SquareNodeData';

const TextAlign = [ 'start', 'center', 'end' ];

const getBackgoundWithTransparacny = (hexBg: string | undefined, transparancy: number) => {
  if (!hexBg) return '#ffffff';
  
  const R = hexBg.slice(1, 3);
  const G = hexBg.slice(3, 5);
  const B = hexBg.slice(5, 7);
  return `#${R}${G}${B}${transparancy.toString(16)}`;
};

const getTransparancyValue = (hexBg: string | undefined) => {
  if (!hexBg) return 255;
  return parseInt(hexBg.slice(7, hexBg.length), 16);
};

export const SquareNodeMenu = ({
  node,
  setNodeItem,
}: DefaultMenuProps<SquareNodeData, SquareNodeSettings>) => {
  if (node?.type !== 'squareNode') return <></>;

  const settings = node.data.settings;

  const handleTextSize = (textSize: string) => {
    setNodeItem({
      style: {
        fontSize: textSize,
      },
      data: {
        settings: {
          textSize,
        },
      },
    });
  };

  const minBorderSize = Math.min(node?.width ?? 0, node?.height ?? 0);

  const renderAlignItemInputs: ReactElement[] = [];
  let i = 0;
  for (const alignItems of TextAlign) {
    for (const justifyContent of TextAlign) {
      i++;
      renderAlignItemInputs.push(
        <input 
          key={i}
          type="radio" 
          name="text-align-option" 
          id={`${alignItems}-${justifyContent}`} 
          onChange={() => {
            setNodeItem({
              style: {
                justifyContent,
                alignItems,
              },
              data: {
                settings: {
                  alignText: alignItems+justifyContent,
                },
              },
            });
          }}
          checked={settings.alignText === alignItems+justifyContent}
        />
      );
    }
  }

  return (
    <div className='square-settings'>
      <div className='default-settings-block'>
        <label>Color</label>
        <input 
          type='color' 
          value={settings.color}
          onChange={(event) => {
            setNodeItem({
              style: {
                background: getBackgoundWithTransparacny(event.target.value, settings.transparancy),
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

      <div className='default-settings-block'>
        <label>Transparancy: { getTransparancyValue(node.style?.background?.toString()) }</label>
        <input 
          type='range' 
          min={0} max={255} step={1} 
          value={ settings.transparancy }
          onChange={(event) => {
            setNodeItem({
              style: {
                background: getBackgoundWithTransparacny(settings.color, +event.target.value),
              },
              data: {
                settings: {
                  transparancy: +event.target.value,
                },
              },
            });
          }} 
        />
      </div>

      <div className='default-settings-block'>
        <label>Border radius: {settings.borderRadius}</label>
        <input 
          type='range' 
          min={0} max={minBorderSize / 2} step={1} 
          value={settings.borderRadius}
          onChange={(event) => {
            setNodeItem({
              style: {
                ...node?.style,
                borderRadius: +event.target.value,
              },
              data: {
                settings: {
                  borderRadius: +event.target.value,
                },
              },
            });
          }}
        />
      </div>
        
      <div className='text-size-label'>
        <label>Text size</label>
      </div>
      <div className="text-size-grid">
        <div className="text-size-block">
          <input 
            key='small-text'
            id="text-size-1" 
            type="radio" 
            className='text-size-option' 
            name="text-size" 
            value="Small"
            onClick={() => handleTextSize(TextSize.SMALL)}
            checked={settings.textSize === TextSize.SMALL}
          /> 
          <label htmlFor="text-size-1">Small</label> 
        </div>
        <div className="text-size-block">
          <input 
            key='large-text'
            id="text-size-3" 
            type="radio" 
            className='text-size-option' 
            name="text-size" 
            value="Large"
            onClick={() => handleTextSize(TextSize.LARGE)}
            checked={settings.textSize === TextSize.LARGE}
          /> 
          <label htmlFor="text-size-3">Large</label> 
        </div>
        <div className="text-size-block">
          <input 
            key='medium-text'
            id="text-size-2" 
            type="radio" 
            className='text-size-option' 
            name="text-size" 
            value="Medium"
            onClick={() => handleTextSize(TextSize.MEDIUM)}
            checked={settings.textSize === TextSize.MEDIUM}
          /> 
          <label htmlFor="text-size-2">Medium</label> 
        </div>
        <div className="text-size-block">
          <input 
            key='xlarge-text'
            id="text-size-4" 
            type="radio" 
            className='text-size-option' 
            name="text-size" 
            value="Extra large"
            onClick={() => handleTextSize(TextSize.X_LARGE)}
            checked={settings.textSize === TextSize.X_LARGE}
          /> 
          <label htmlFor='text-size-4'>Extra large</label>
        </div>
      </div>
      <div className='text-size-label'>
        <label>Align text</label>
      </div>
      <div className="text-align-grid">
        {renderAlignItemInputs}
      </div>
      <hr/>
    </div>  
  );
};