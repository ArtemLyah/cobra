import { RoadmapDifficultyEnum } from '../types/roadmapDifficulty.type';
import { Tag } from '../types/tag.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';

export class RoadmapShortResponse {
  id: string;
  title: string;
  description: string;
  difficulty: RoadmapDifficultyEnum;
  rating: number;
  reviewsAmount: number;
  created_at: Date;
  tags: Tag[];
  userStates: UserRoadmapState[];
}