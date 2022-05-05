/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { fetchUserGames } from '../../redux/thunk/user';
import { setUserDescribe } from '../../redux/thunk/userProfile';
import style from './Profile.module.css';

function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    dispatch(fetchUserGames(user?.steamId));
  }, [user]);
  function openSteam (){
    window.open(`${user.steamProfileLink}`);
  }
  const [textAriaValue, settextAriaValue] = useState(`${user.description}`)
  function changeDesc(){
    dispatch(setUserDescribe(user.steamId, textAriaValue))
    setHidden(!hidden)
  }
  return (
    <div>
      <h1 className={style.profile__title}>{user.steamNickname}</h1>
      <div className={style.profile__wrapper}>
        <img src={user.steamAvatar} alt="avatarUser" className={style.avatar} />
        <div>
          {hidden ? 
          <div className={style.describe__block}>
          <h4>Описание:</h4>
          <p>{user.description}</p>
          </div>
           :
          <div className={style.textarea__block}> 
          <textarea className={style.textarea} onChange={(e)=>settextAriaValue(e.target.value)} defaultValue={user.description || '' }/>
          <Button type="Button" onClick={()=>changeDesc}>Изменить</Button>
          </div>
          }
        </div>
        <div className={style.buttons__block}>
          <Button type="Button" onClick={()=>openSteam}>Открыть профиль в стиме</Button>
          {hidden ? 
          <Button type="Button" onClick={()=>setHidden(!hidden)}>Редактировать описание профиля</Button>
           :
          ''
          }
          
        </div>
      </div>
      {profGames.map((game, i) => (
        <div className={style.games__block} key={game.gameSteamId}>
          <p>{i+1}</p>
          <h4>{game.gameName}</h4>
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
            alt={`appIcon_${game.gameSteamId}`}
            width="200px"
            key={Date.now()}
          />
          <p>Количество часов: {game.userGameHours}</p>
        </div>
      ))}
    <div>
      <h1>Comments block soon...</h1>
    </div>
    </div>
  );
}

export default Profile;
