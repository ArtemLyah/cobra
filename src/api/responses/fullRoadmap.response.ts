import { MapStructure } from '../types/mapStructure.type';
import { RoadmapResponse } from './roadmap.response';

export class FullRoadmapResponse extends RoadmapResponse {
  map: MapStructure;
  owner: {
    id: string;
    username: string;
    avatar: string;
  };
}