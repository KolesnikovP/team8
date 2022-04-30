/* eslint-disable react/prop-types */
import React from 'react';
import './style.css';

function ListGameRadio({ game }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="radio-control">
      <input type="radio" name="steamApp" value={game.gameSteamId} />
      <span className="radio-input">
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
          alt={`appIcon_${game.gameSteamId}`}
        />
        {/* <span>{game.gameSteamName}</span> */}
      </span>
    </label>
  );
}

export default ListGameRadio;
