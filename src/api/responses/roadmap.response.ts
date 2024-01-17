import { RoadmapDifficultyEnum } from '../types/roadmapDifficulty.type';
import { Tag } from '../types/tag.type';

export class RoadmapResponse {
  title: string;
  description: string;
  difficulty: RoadmapDifficultyEnum;
  created_at: Date;
  tags: Tag[];
}