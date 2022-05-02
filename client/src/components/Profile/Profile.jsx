import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGames } from '../../redux/thunk/user';
import style from './Profile.module.css';

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserGames(user?.[0]?.id));
  }, [user]);
  return (
    <div>
      <h1 className={style.profile__title}>{user[0].displayName}</h1>
      <div className={style.profile__wrapper}>
        <img src={user[0].photos[2].value} alt="" className="avatar" />
        <div>
          <h4>Описание:</h4>
        </div>
      </div>
      {profGames.map((game) => (
        <div>
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
            alt={`appIcon_${game.gameSteamId}`}
            width="400px"
            key={Date.now()}
          />
          <p>Количество часов: {game.userGameHours}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
