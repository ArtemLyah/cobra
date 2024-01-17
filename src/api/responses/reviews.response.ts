export class ReviewsResponse {
  userId: string;
  roadmapId: string;
  rate: number;
  text: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}