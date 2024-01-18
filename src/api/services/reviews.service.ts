import { AxiosAdapter } from '../AxiosAdapter';
import { ReviewCreateDTO } from '../dtos/review.create';
import { ReviewsResponse } from '../responses/reviews.response';
import { url } from '../urls';
import { useAuthorisation } from '../utils';

class ReviewsService {
  create (token: string, roadmapId: string, data: ReviewCreateDTO): Promise<ReviewsResponse> {
    return AxiosAdapter.post<ReviewCreateDTO, ReviewsResponse>(
      url.CREATE_REVIEW(roadmapId),
      data,
      useAuthorisation(token)
    ).fetchData();
  }

  getAll (token: string, roadmapId: string): Promise<ReviewsResponse[]> {
    return AxiosAdapter.get<ReviewsResponse[]>(
      url.GET_REVIEWS(roadmapId),
      useAuthorisation(token)
    ).fetchData();
  }
}

export const reviewsService = new ReviewsService();