import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyRoadmapsResponse } from '../../../api/responses/myRoadmaps.response';
import { RoadmapShortResponse } from '../../../api/responses/roadmapShort.response';
import { roadmapService } from '../../../api/services/roadmap.service';
import { UserRoadmapState } from '../../../api/types/userRoadmapState.type';
import useCookie from '../../../hooks/useCookie';
import { removeState, addState } from '../../../pages/homePage/utils';

import './styles/roadmapListItem.css';

interface RoadmapItemProps {
  roadmap: RoadmapShortResponse
  myMaps: MyRoadmapsResponse,
  setMyMaps: Dispatch<SetStateAction<MyRoadmapsResponse>>
}

const RoadmapListItem = ({ roadmap, myMaps, setMyMaps }: RoadmapItemProps) => {
  const { id, title, description, reviewsAmount, rating, userStates } = roadmap;

  const [ isFav, setIsFav ] = useState(
    userStates.find((state) => state === UserRoadmapState.FAVORITE) !== undefined
  );
  const [ isSub, setIsSub ] = useState(
    userStates.find((state) => state === UserRoadmapState.SIGNED) !== undefined
  );
  const { token } = useCookie();

  const toggleSubscribe = async () => {
    setIsSub(!isSub);
    if (isSub) {
      setMyMaps({
        ...myMaps,
        signed: myMaps.signed.filter(map => map.id !== id),
      });
      await roadmapService.removeUserState(token, id, UserRoadmapState.SIGNED);
    } else {
      setMyMaps({
        ...myMaps,
        signed: myMaps.signed.concat({
          ...roadmap,
          userStates: roadmap.userStates.concat([ UserRoadmapState.SIGNED ]),
        }),
      });
      await roadmapService.setUserState(token, id, UserRoadmapState.SIGNED);
    }
  };

  const toggleFavorite = async () => {
    if (isFav) {
      setMyMaps({
        signed: removeState(myMaps.signed, id, UserRoadmapState.FAVORITE),
        favorite: myMaps.favorite.filter(map => map.id !== id),
        owned: removeState(myMaps.owned, id, UserRoadmapState.FAVORITE),
      });
      await roadmapService.removeUserState(token, id, UserRoadmapState.FAVORITE);
    } else {
      setMyMaps({
        signed: addState(myMaps.signed, id, UserRoadmapState.FAVORITE),
        favorite: myMaps.favorite.concat({
          ...roadmap,
          userStates: roadmap.userStates.concat([ UserRoadmapState.FAVORITE ]),
        }),
        owned: addState(myMaps.owned, id, UserRoadmapState.FAVORITE),
      });
      await roadmapService.setUserState(token, id, UserRoadmapState.FAVORITE);
    }
  };

  useEffect(() => {
    setIsFav(
      myMaps.favorite.find((map) => map.id === id)?.
        userStates?.
        find((state) => state === UserRoadmapState.FAVORITE) !== undefined
    );
  }, [ myMaps ]);

  return (
    <div className='roadmap-list-item'>
      
      <div className='description-container'>
        <p className='map-title'>
          {title}
        </p>
        <text className='map-description'>
          {description}
        </text>
      </div>

      <div className='interaction'>

        <p className='reviews'>
          Reviews: {reviewsAmount}
        </p>

        <i className="fa-solid fa-star">
          {rating}
        </i>

        <Link to={`/roadmaps/${id}`} className='read-more-btn'><span>Read more</span></Link>
        
        <div className='sub-fav'>
          <button 
            className={isSub ? 'subscribe-btn active' : 'subscribe-btn inactive'}
            onClick={toggleSubscribe}>
            {isSub ? 'Subscribed!' : 'Subscribe'}
          </button>
          <button className='fav-btn' onClick={toggleFavorite}>
            <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapListItem;