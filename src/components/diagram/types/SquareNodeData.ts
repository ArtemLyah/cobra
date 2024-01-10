import { DefaultNodeDataWithContent } from './DefaultNodeData';

export class TextSize {
  static SMALL='small';
  static MEDIUM='medium';
  static LARGE='large';
  static X_LARGE='x-large';
}

export enum AlignText {
  SS='startstart',
  SC='startcenter',
  SE='startend',
  CS='centerstart',
  CC='centercenter',
  CE='centerend',
  ES='endstart',
  EC='endcenter',
  EE='endend',
}

export interface SquareNodeSettings {
  color: string;
  transparancy: number;
  borderRadius: number;
  textSize: string;
  alignText: AlignText | string;
}

export interface SquareNodeData extends DefaultNodeDataWithContent {
  settings: SquareNodeSettings;
}