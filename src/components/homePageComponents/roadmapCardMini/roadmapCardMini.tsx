import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { MyRoadmapsResponse } from '../../../api/responses/myRoadmaps.response';
import { RoadmapShortResponse } from '../../../api/responses/roadmapShort.response';
import { roadmapService } from '../../../api/services/roadmap.service';
import { UserRoadmapState } from '../../../api/types/userRoadmapState.type';
import useCookie from '../../../hooks/useCookie';
import { addState, removeState } from '../../../pages/homePage/utils';

import './roadmapCardMini.css';

interface RoadmapCardProps {
  roadmap: RoadmapShortResponse,
  myMaps: MyRoadmapsResponse,
  setMyMaps: Dispatch<SetStateAction<MyRoadmapsResponse>>
}

const RoadmapCardMini = ({ roadmap, myMaps, setMyMaps }: RoadmapCardProps) => {
  const [ isFav, setIsFav ] = useState(
    roadmap.userStates.find((state) => state === UserRoadmapState.FAVORITE) !== undefined 
  );
  const { token } = useCookie();

  const toggleHeart = async () => {
    if (isFav) {
      await roadmapService.removeUserState(token, roadmap.id, UserRoadmapState.FAVORITE);
      setMyMaps({
        favorite: myMaps.favorite.filter(map => map.id !== roadmap.id),
        signed: removeState(myMaps.signed, roadmap.id, UserRoadmapState.FAVORITE),
        owned: removeState(myMaps.owned, roadmap.id, UserRoadmapState.FAVORITE),
      });
    } else {
      setMyMaps({
        favorite: myMaps.favorite.concat({
          ...roadmap,
          userStates: roadmap.userStates.concat([ UserRoadmapState.FAVORITE ]),
        }),
        signed: addState(myMaps.signed, roadmap.id, UserRoadmapState.FAVORITE),
        owned: addState(myMaps.owned, roadmap.id, UserRoadmapState.FAVORITE),
      });
      await roadmapService.setUserState(token, roadmap.id, UserRoadmapState.FAVORITE);
    }
  };

  useEffect(() => {
    setIsFav(
      myMaps.favorite.find((map) => map.id === roadmap.id)?.
        userStates?.
        find((state) => state === UserRoadmapState.FAVORITE) !== undefined
    );
  }, [ myMaps ]);

  const handleHeartClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click event from propagating to the outer card
    event.stopPropagation();
    toggleHeart();
  };

  return (
    <div className='roadmapCardMini'>
      <Link to={`/roadmaps/${roadmap.id}`} className='roadmapCardMini__name'>{roadmap.title}</Link>
      <div className='roadmapCardMini__icons'>
        <div className='roadmapCardMini__icons_fav_btn' onClick={handleHeartClick}>
          <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
        </div>
        <div className='roadmapCardMini__rating'>
          <i className='roadmapCardMini__rating_union fa-solid fa-star'></i>
          <div className='roadmapCardMini__rating_number'>{roadmap.rating}</div>
        </div>
      </div>
    </div>
  );
};
export default RoadmapCardMini;