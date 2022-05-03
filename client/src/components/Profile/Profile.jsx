/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserGames } from '../../redux/thunk/user';
import style from './Profile.module.css';

function Profile({user}) {
  // const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserGames(user?.steamId));
  }, [user]);
  return (
    <div>
      <h1 className={style.profile__title}>{user.steamNickname}</h1>
      <div className={style.profile__wrapper}>
        <img src={user.steamAvatar} alt="avatarUser" className={style.avatar} />
        <div>
          <h4>Описание:</h4>
          <p>{user.description}</p>
        </div>
        <div className={style.buttons__block}>
            <button type="button">Открыть профиль в стиме</button>
            <button type="button">Редактировать описание профиля</button>
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
