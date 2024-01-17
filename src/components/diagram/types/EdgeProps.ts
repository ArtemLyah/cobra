import { EdgeProps as EdgeSettings } from 'reactflow';

export interface EdgeProps<D=any> extends EdgeSettings {
  data: D;
}