import { Node, XYPosition } from 'reactflow';

export interface CreateNodeArgs extends Partial<Node> {
  id: string; 
  position: XYPosition;
}

export interface CreateNodeWithTypeArgs extends CreateNodeArgs {
  type: string;
}