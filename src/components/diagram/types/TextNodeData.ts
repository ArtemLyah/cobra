import { DefaultNodeData } from './DefaultNodeData';

export interface TextNodeSettings {
  color: string;
  textSize: number;
}

export interface TextNodeData extends DefaultNodeData {
  settings: TextNodeSettings
}