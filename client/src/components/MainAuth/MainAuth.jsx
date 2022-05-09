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

function MainAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfetchUsersList());
  }, [dispatch]);

  const { usersList } = useSelector((state) => state.usersListReducer);
  const { profGames } = useSelector((state) => state.profileReducer);
  const [news, setNews] = useState(null);
  useEffect(() => {
    const rnd = Math.floor(Math.random() * profGames.length);
    if (profGames[rnd]?.gameSteamId) {
      getNews(profGames[rnd].gameSteamId, setNews);
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
          {news ? (
            <Box sx={{ width: '65%', textAlign: 'center' }}>{Parser(`${news}`)}</Box>
          ) : (
            <Loader />
          )}
          <Box>
            <List sx={{ width: '100%' }}>
              {usersList.map((user) => (
                <UsersListItem
                  key={user.id}
                  user={user}
                  handleOpen={handleOpen}
                  setUserState={setUserState}
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
