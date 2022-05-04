/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './findForm.module.css';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import ListGameRadio from '../ListGameRadio/ListGameRadio';
import { addNewPostFetch } from '../../redux/thunk/posts';

function FindForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { games } = useSelector((state) => state.gamesListReducer);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const sendFormPost = useCallback(
    (event) => {
      event.preventDefault();
      const { gameSteamId, description } = event.target;
      const post = {
        description: description.value,
        gameSteamId: gameSteamId.value,
        userId: user.id,
        userSteamAvatar: user.steamAvatar,
      };
      dispatch(addNewPostFetch(post));
      navigate('/');
    },
    [dispatch, navigate, user]
  );

  return (
    <section className={style.div}>
      <form action="" method="post" onSubmit={sendFormPost}>
        <div className="radio-form">
          {games.map((game) => {
            return <ListGameRadio key={game.id} game={game} />;
          })}
        </div>
        <textarea
          className={style.textarea}
          name="description"
          placeholder="Опишите себя и свой стиль игры..."
        />
        <button className={style.btn} type="submit">
          Опубликовать заявку
        </button>
      </form>
    </section>
  );
}

export default FindForm;
