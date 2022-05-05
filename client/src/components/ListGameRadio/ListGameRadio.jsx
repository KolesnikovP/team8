/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import './style.css';

function ListGameRadio({ game }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <div className="radio-form">
      <label className="radio-control">
        <input type="radio" name="gameSteamId" value={game.gameSteamId} />
        <span className="radio-input">
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.gameSteamId}/header.jpg?t=1650992920`}
            alt={`appIcon_${game.gameSteamId}`}
          />
          {/* <span>{game.gameSteamName}</span> */}
        </span>
      </label>
    </div>
  );
}

export default ListGameRadio;
