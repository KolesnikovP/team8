/* eslint-disable react/prop-types */
import React from 'react';
// import { useSelector } from 'react-redux';

function PostMin({ post }) {
  // const game = games.find((findGame) => findGame.id === post.gameId);
  // console.log(game);

  return (
    <div>
      {/* <img
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
        alt={`appIcon_${game.gameSteamId}`}
      /> */}
      <p>{post.description}</p>
    </div>
  );
}

export default PostMin;
