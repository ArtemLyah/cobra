import React, { useEffect } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import { HTMLAttributes } from 'react';
import { Edge, useReactFlow, MarkerType, EdgeMarker } from 'reactflow';
import { DefaultEdgeData, DefaultEdgeSettings, Marker } from '../types/DefaultEdgeData';
import { useSetEdge } from './contextMenuSettings';


export interface ContextEdgeMenuProps extends HTMLAttributes<any> {
  edgeId: string;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}

export const ContextEdgeMenu = ({
  edgeId,
  setEdges,
}: ContextEdgeMenuProps) => {
  const { getEdge } = useReactFlow();
  const [ edge, setEdge ] = useState<Edge<DefaultEdgeData<DefaultEdgeSettings>> | undefined>(getEdge(edgeId));
  const settings = edge?.data?.settings;

  const markerOptions: Marker[] = [
    {
      value: undefined,
      label: 'None',
    },
    {
      value: { type: MarkerType.Arrow },
      label: 'Arrow',
    },
    {
      value: { type: MarkerType.ArrowClosed },
      label: 'Arrow Closed',
    },
  ];

  const setEdgeItem = useSetEdge({
    edge,
    setEdge,
    setEdges,
  });


  useEffect(() => {
    const foundNode = getEdge(edgeId);
    setEdge(foundNode);
    console.log(edge?.markerStart, edge?.markerEnd);
  }, [ getEdge(edgeId) ]);

  const handleTypeChange = (type) => {
    setEdgeItem({
      type: type,
    });
  };
  

  const handleMarkerStart = ( marker_label: string ) => {
    const marker = markerOptions.filter((mark) => mark.label === marker_label)[0];
   
    setEdgeItem({
      markerStart: marker.value,
      data: {
        settings: {
          markerStart: marker,
        },
      },
      
    });    
  };

  const handleMarkerEnd = ( marker_label: string ) => {
    const marker = markerOptions.filter((mark) => mark.label === marker_label)[0];

    setEdgeItem({
      markerEnd: marker.value,
      data: {
        settings: {
          markerEnd: marker,
        },
      },
    });
    
  };

  return (
    <div
      style={{ zIndex: 10 }}
      className="context-menu"
    >
      <div className='default-settings'>

        <div className="default-settings-block">
          <p className='node-number'>Edge</p>
        </div>

        <div className="default-settings-block">
          <label>Label</label>
          <input type="text" value={edge?.data?.label} onChange={(event) => {
            setEdgeItem({
              label: event.target.value,
              data: {
                label: event.target.value,
              },
            });
          }}/>
        </div>
        <hr/>
        <div className="default-settings-block">
          <label>Color</label>
          <input 
            type="color" 
            value={settings?.stroke}
            onChange={(event) => {

              setEdgeItem({
                style: {
                  stroke: event.target.value,
                },
                markerStart: { ...edge?.markerStart as EdgeMarker, color: event.target.value },
                markerEnd: { ...edge?.markerEnd as EdgeMarker, color: event.target.value },

                data: {
                  settings: {
                    stroke: event.target.value,
                    markerStart: {
                      value: { ...edge?.markerStart as EdgeMarker, color: event.target.value },
                    },
                    markerEnd: {
                      value:  { ...edge?.markerEnd as EdgeMarker, color: event.target.value },
                    },
                  },
                },
              });
            }}
          />
        </div>
        <hr/>
        <div className="default-settings-block" >
          <label>Edge Style</label>
          <br/>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 2fr)', 
            justifyContent: 'center' }}>
            <div >
              <input 
                type='radio'
                id='type-1'
                name='type'
                value='default'
                onClick={() => handleTypeChange('default')}
                checked={edge?.type === 'default'}
              />
              <label htmlFor='type-1'>Default</label>
            </div>
            <div>
              <input 
                type='radio'
                id='type-2'
                name='type'
                value='simplebezier'
                onClick={() => handleTypeChange('simplebezier')}
                checked={edge?.type === 'simplebezier'}
              />
              <label htmlFor='type-2'>Simple Bezier</label>
            </div>
            <div>
              <input 
                type='radio'
                id='type-3'
                name='type'
                value='smoothstep'
                onClick={() => handleTypeChange('smoothstep')}
                checked={edge?.type === 'smoothstep'}
              />
              <label htmlFor='type-3'>Smooth Step</label>
            </div>
            <div>
              <input 
                type='radio'
                id='type-4'
                name='type'
                value='straight'
                onClick={() => handleTypeChange('straight')}
                checked={edge?.type === 'straight'}
              />
              <label htmlFor='type-4'>Straight</label>
            </div>
          </div>
        </div>   
        <hr/>
        <div className="default-settings-block">
          <div>
            <label>Marker Start</label>
            <select value={settings?.markerStart?.label ?? 'None'} onChange={(event) => handleMarkerStart(event.target.value)}>
              { markerOptions.map((marker) =>
                <option key={`start-${marker.value?.type.toString()}`} value={marker.label}>
                  {marker.label}
                </option> 
              )}
            </select>
          </div>
          <div>
            <label>Marker End</label>
            <select value={settings?.markerEnd?.label ?? 'None'} onChange={(event) => handleMarkerEnd(event.target.value)}>
              { markerOptions.map((marker) =>
                <option key={`end-${marker.value?.type.toString()}`} value={marker.label}>
                  {marker.label}
                </option> 
              )}
            </select>
          </div>
        </div> 

        <div className="default-settings-block">
          <label>Thickness</label>

          <label htmlFor='thickness-small'>Small</label>
          <input 
            id="thickness-small" 
            type="radio" 
            name="thickness" 
            checked={edge?.style?.strokeWidth === 1}
            onClick={() => {
              setEdgeItem({
                style: {
                  strokeWidth: 1,
                },
              });
            }}
          />
          
          <label htmlFor='thickness-medium'>Medium</label>
          <input 
            id="thickness-medium" 
            type="radio" 
            name="thickness" 
            checked={edge?.style?.strokeWidth === 3}
            onClick={() => {
              setEdgeItem({
                style: {
                  strokeWidth: 3,
                },
              });
            }}
          />

          <label htmlFor='thickness-large'>Large</label>
          <input 
            id="thickness-large" 
            type="radio" 
            name="thickness"
            checked={edge?.style?.strokeWidth === 5}
            onClick={() => {
              setEdgeItem({
                style: {
                  strokeWidth: 5,
                },
              });
            }} 
          />
        </div>
      </div>
      
    </div>
  );
};