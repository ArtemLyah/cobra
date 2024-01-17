import { NodeProps as NodeSettings } from 'reactflow';

export interface NodeProps<D=any> extends NodeSettings {
  data: D;
}