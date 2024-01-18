import { RoadmapShortResponse } from '../../api/responses/roadmapShort.response';
import { UserRoadmapState } from '../../api/types/userRoadmapState.type';

export const addState = (maps: RoadmapShortResponse[], roadmapId: string, userState: UserRoadmapState) => {
  return maps.map(map => {
    if (map.id !== roadmapId) return map;
    return {
      ...map,
      userStates: map.userStates.concat(userState),
    };
  });
};

export const removeState = (maps: RoadmapShortResponse[], roadmapId: string, userState: UserRoadmapState) => {
  return maps.filter(map => {
    if (map.id !== roadmapId) return map;
    return {
      ...map,
      userStates: map.userStates.filter(state => state === userState),
    };
  });
};