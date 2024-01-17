import { AxiosAdapter } from '../AxiosAdapter';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { MyRoadmapsResponse } from '../responses/myRoadmaps.response';
import { OkResponse } from '../responses/ok.response';
import { RoadmapResponse } from '../responses/roadmap.response';
import { RoadmapShortResponse } from '../responses/roadmapShort.response';
import { RoadmapsFilter } from '../types/roadmapsFilter.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';
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

  getMyMaps (token: string): Promise<MyRoadmapsResponse> {
    return AxiosAdapter.get<MyRoadmapsResponse>(
      url.GET_MY_ROADMAPS, 
      useAuthorisation(token)
    ).fetchData();
  }

  getAll (token: string, filter?: RoadmapsFilter): Promise<RoadmapShortResponse[]> {
    return AxiosAdapter.get<RoadmapShortResponse[]>(
      url.GET_ROADMAPS, 
      {
        ...useAuthorisation(token),
        params: filter,
      }
    ).fetchData();
  }
  
  setUserState (token: string, roadmapId: string, state: UserRoadmapState): Promise<UserRoadmapState> {
    return AxiosAdapter.post<any, UserRoadmapState>(
      url.SET_USER_STATE(roadmapId), 
      undefined,
      {
        ...useAuthorisation(token),
        params: {
          state,
        },
      }
    ).fetchData();
  }

  removeUserState (token: string, roadmapId: string, state: UserRoadmapState): Promise<OkResponse> {
    return AxiosAdapter.delete<OkResponse>(
      url.REMOVE_USER_STATE(roadmapId), 
      {
        ...useAuthorisation(token),
        params: {
          state,
        },
      }
    ).fetchData();
  }
}

export const roadmapService = new RoadmapService();