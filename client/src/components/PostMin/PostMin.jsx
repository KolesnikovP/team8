/* eslint-disable react/prop-types */
import React from 'react';
// import { useSelector } from 'react-redux';
import style from './PostMin.module.css';

function PostMin({ post, games }) {
  const game = games.find((findGame) => findGame.id === post.gameId);
  // console.log(games);

  return (
    <div>
      <img
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
        alt={`appIcon_${game.gameSteamId}`}
      />
      <p>{post.description}</p>
      <div>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${post.gameAppId}/header.jpg?t=1650992920`}
          alt={`appIcon_${post.gameName}`}
          className={style.gameImg}
        />
        <span>{post.userHours}</span>
      </div>
      <div>
        <button type="button"> Открыть профиль</button>
        <button type="button">Написать хуеплету</button>
      </div>
    </div>
  );
}

export default PostMin;
