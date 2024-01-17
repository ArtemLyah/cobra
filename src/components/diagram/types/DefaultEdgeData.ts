import { EdgeMarker } from 'reactflow';

export interface Marker {
  value: EdgeMarker | undefined;
  label: string;
}

export class DefaultEdgeSettings {
  label: string;
  markerStart: Marker;
  markerEnd: Marker;
  stroke: string;
}

export class DefaultEdgeData<S=any> {
  label?: string;
  settings?: S;
}