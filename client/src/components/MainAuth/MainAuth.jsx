/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useCallback, useEffect, useState } from 'react';
// import styled from '@emotion/styled';
import { Container, List, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Parser from 'html-react-parser';
import { getfetchUsersList } from '../../redux/thunk/user';
import UsersListItem from '../UsersList/UsersListItem';
import UserCardModal from '../UserCardModal/UserCardModal';
import Loader from '../Loader/Loader';
import './Main.module.css';
import { getNews } from '../../redux/thunk/getNews';
import { getFetchGamesList } from '../../redux/thunk/getGame';

function MainAuth(props) {
  const { handleClickOpenChat, user, getId } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfetchUsersList());
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const { usersList } = useSelector((state) => state.usersListReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const { games } = useSelector((state) => state.gamesListReducer);
  const [news, setNews] = useState(null);
  useEffect(() => {
    const rnd = Math.floor(Math.random() * profGames.length);
    if (profGames[rnd]?.gameSteamId) {
      getNews(profGames[rnd].gameSteamId, setNews);
    }
    if (games[rnd]?.gameSteamId) {
      getNews(games[rnd]?.gameSteamId, setNews);
    }
  }, [profGames]);
  const [openModal, setOpenModal] = useState(false);
  const [userState, setUserState] = useState({
    id: 0,
    description: '',
    steamId: '',
    steamNickname: '',
    steamProfileLink: '',
    steamAvatar: '',
  });

  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
          }}
        >
          {news ? <Box sx={{ textAlign: 'center' }}>{Parser(`${news}`)}</Box> : <Loader />}
          <Box sx={{ width: '30%', marginLeft: '1rem' }}>
            <List>
              {usersList
                .filter((otherUser) => otherUser.id !== user.id)
                .map((otherUser) => (
                  <UsersListItem
                    key={otherUser.id}
                    user={otherUser}
                    handleOpen={handleOpen}
                    setUserState={setUserState}
                    handleClickOpenChat={handleClickOpenChat}
                    getId={getId}
                  />
                ))}
            </List>
          </Box>
        </Box>
      </Container>
      <UserCardModal openModal={openModal} setOpenModal={setOpenModal} user={userState} />
    </>
  );
}

export default MainAuth;
