import { AxiosAdapter } from '../AxiosAdapter';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { RoadmapResponse } from '../responses/roadmap.response';
import { url } from '../urls';
import { useAuthorisation } from '../utils';

class RoadmapService {
  createWithMap (token: string, data: RoadmapCreateDTO): Promise<FullRoadmapResponse> {
    return AxiosAdapter.post<RoadmapCreateDTO, FullRoadmapResponse>(
      url.CREATE_FULL_ROADMAP, 
      data,
      useAuthorisation(token)
    ).fetchData();
  }
  
  getWithMap (token: string, roadmapId: string): Promise<FullRoadmapResponse> {
    return AxiosAdapter.get<FullRoadmapResponse>(
      url.GET_FULL_ROADMAP(roadmapId), 
      useAuthorisation(token)
    ).fetchData();
  }

  get (token: string, roadmapId: string): Promise<RoadmapResponse> {
    return AxiosAdapter.get<RoadmapResponse>(
      url.GET_ROADMAP(roadmapId), 
      useAuthorisation(token)
    ).fetchData();
  }
}

export const roadmapService = new RoadmapService();