/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  RadioGroup,
  Typography,
} from '@mui/material';
// import style from './findForm.module.css';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import ListGameRadio from '../ListGameRadio/ListGameRadio';
import { addNewPostFetch } from '../../redux/thunk/posts';

function FindForm(props) {
  const { handleClose, open } = props;
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.gamesListReducer);
  const { user } = useSelector((state) => state.userReducer);

  // const [isEmpty, setIsEmpty] = useState(true);
  const [helperText, setHelperText] = useState('Выберите игру');

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
    },
    [dispatch, navigate, user]
  );

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="find-teammate-dialog">
      <DialogTitle id="form-dialog-title">Поиск напарников</DialogTitle>
      <DialogContent>
        <Typography>{helperText}</Typography>
        <Box className="radio-form" component="div">
          <RadioGroup row>
            {games.map((game) => {
              return <ListGameRadio key={game.id} game={game} setHelperText={setHelperText} />;
            })}
          </RadioGroup>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Ваши ожидания"
          type="text"
          fullWidth
          multiline
          maxRows={4}
          minRows={4}
        />
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
