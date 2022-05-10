/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  RadioGroup,
  DialogTitle,
  Box,
} from '@mui/material';
import { getAllBg, updateBgFetch } from '../../redux/thunk/bgVideo';
import ListBgRadio from '../ListBgRadio/ListBgRadio';

function ProfileModalBg(props) {
  const dispatch = useDispatch();
  const { setOpen, open, userId } = props;
  const [bgList, setBgList] = useState(null);
  const [radioValue, setRadioValue] = useState('');

  useEffect(() => {
    getAllBg(setBgList);
  }, []);

  const changeRadioValue = useCallback((event) => {
    setRadioValue(event.target.value);
  }, []);
  const updateBg = useCallback(() => {
    const userBg = { id: userId, bgVideoId: radioValue };
    dispatch(updateBgFetch(userBg));
    document.location.reload();
  }, [radioValue]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="find-teammate-dialog"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Поиск напарников</DialogTitle>
      <DialogContent>
        <Box className="radio-form" component="div">
          <RadioGroup row value={radioValue} onClick={changeRadioValue}>
            {bgList?.map((bg) => {
              return <ListBgRadio key={bg.id} bg={bg} />;
            })}
          </RadioGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={updateBg}>
          Изменить фон
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="warning"
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileModalBg;
