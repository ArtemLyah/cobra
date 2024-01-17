import { RoadmapDifficultyEnum } from '../types/roadmapDifficulty.type';
import { Tag } from '../types/tag.type';

export class FullRoadmapResponse {
  id: string;
  title: string;
  description: string;
  difficulty: RoadmapDifficultyEnum;
  tags: Tag[];
  created_at: Date;
}