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
// import { getFetchGamesList } from '../../redux/thunk/getGame';
import ListGameRadio from '../ListGameRadio/ListGameRadio';
import { addNewPostFetch } from '../../redux/thunk/posts';
import { fetchUserGames } from '../../redux/thunk/user';

function FindForm(props) {
  const { handleClose, open } = props;
  const dispatch = useDispatch();
  // const { games } = useSelector((state) => state.gamesListReducer);
  const { profGames } = useSelector((state) => state.profileReducer)
  const { user } = useSelector((state) => state.userReducer);

  const [description, setDescription] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [helperText, setHelperText] = useState('Выберите игру');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (description !== '' && radioValue !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    };
  }, [description, radioValue]);

  const changeDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const changeRadioValue = useCallback((event) => {
    setRadioValue(event.target.value);
  }, []);

  const modalClose = useCallback(() => {
    setHelperText('Выберите игру');
    setDescription('');
    setRadioValue('');
  }, []);

  useEffect(() => {
    dispatch(fetchUserGames(user?.steamId));
  }, [user]);

  const sendFormPost = useCallback(
    () => {
      const post = {
        description,
        gameSteamId: radioValue,
        steamId: user.steamId,
        userId: user.id,
        userSteamAvatar: user.steamAvatar,
      };
      dispatch(addNewPostFetch(post));
      modalClose();
      setHelperText('Заявка успешно создана!');
      setTimeout(() => handleClose(modalClose()), 1000)
    },
    [description, radioValue]
  );
  return (
    <Dialog open={open} onClose={() => { handleClose(); modalClose() }} aria-labelledby="find-teammate-dialog" fullWidth>
      <DialogTitle id="form-dialog-title" sx={{ textAlign: 'center' }}>Поиск напарников</DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center' }}>{helperText}</Typography>
        <Box className="radio-form" component="div">
          <RadioGroup row value={radioValue} onClick={changeRadioValue} sx={{ display: 'flex', justifyContent: 'center' }}>
            {profGames.map((profGame) => {
              return <ListGameRadio key={profGame.id} game={profGame} setHelperText={setHelperText} />;
            })}
          </RadioGroup>
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Описание заявки"
          type="text"
          fullWidth
          multiline
          maxRows={4}
          minRows={4}
          value={description}
          onChange={changeDescription}
        />
        {/* {!formValid && <Typography variant="subtitle2" >Выберите игру и заполните описание.</Typography>} */}
      </DialogContent>
      <DialogActions>
        <Button disabled={!formValid} color="primary" onClick={sendFormPost}>
          {formValid ? "Опубликовать заявку" : "Заполните все поля"}
        </Button>
        <Button onClick={() => { handleClose(); modalClose() }} color="warning">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FindForm;
