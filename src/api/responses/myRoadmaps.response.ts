import { RoadmapShortResponse } from './roadmapShort.response';

export class MyRoadmapsResponse {
  favorite: RoadmapShortResponse[];
  owned: RoadmapShortResponse[];
  signed: RoadmapShortResponse[];
}