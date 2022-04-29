import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './findForm.module.css';
// import { gamesListReducer } from '../../redux/reducers/gamesListReducer';
import { getFetchGamesList } from '../../redux/thunk';
import ListGameRadio from '../ListGameRadio/ListGameRadio';

function FindForm() {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesListReducer);
  useEffect(() => {
    dispatch(getFetchGamesList());
  }, [dispatch]);
  // console.log(games);
  return (
    <div className={style.div}>
      <form action="" method="post">
        <div className="radio-form">
          {games.map((game) => {
            return <ListGameRadio key={game.id} game={game} />;
          })}
        </div>
        <textarea className={style.textarea} placeholder="Опишите себя и свой стиль игры..." />
        <button type="submit">Опубликовать заявку</button>
      </form>
    </div>
  );
}

export default FindForm;
