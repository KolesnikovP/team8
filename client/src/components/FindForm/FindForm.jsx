/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
// import style from './findForm.module.css';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import ListGameRadio from '../ListGameRadio/ListGameRadio';
import { addNewPostFetch } from '../../redux/thunk/posts';

function FindForm(props) {
  const { handleClose, open } = props;
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
    <Dialog open={open} onClose={handleClose} aria-labelledby="find-teammate-dialog">
      <DialogTitle id="form-dialog-title">Поиск напарников</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Ваши ожидания"
          type="text"
          fullWidth
        />
        {games.map((game) => {
          return <ListGameRadio key={game.id} game={game} />;
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={sendFormPost} color="primary">
          Опубликовать заявку
        </Button>
        <Button onClick={handleClose} color="warning">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FindForm;
