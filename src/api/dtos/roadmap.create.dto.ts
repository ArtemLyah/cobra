import { MapStructure } from '../types/mapStructure.type';
import { RoadmapDifficultyEnum } from '../types/roadmapDifficulty.type';

export class RoadmapCreateDTO {
  title: string;
  description: string;
  difficulty: RoadmapDifficultyEnum;
  tags: string[];
  structure: MapStructure;
}