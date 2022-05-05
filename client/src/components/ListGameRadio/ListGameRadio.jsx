/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import './style.css';

function ListGameRadio({ game, setHelperText }) {
  const radioChecked = useCallback(() => {
    setHelperText(`${game.gameSteamName}`);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="radio-control">
      <input type="radio" name="gameSteamId" value={game.gameSteamId} onClick={radioChecked} />
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
