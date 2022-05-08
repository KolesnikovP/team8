import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Grid, Container, Paper, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getfetchUsersList } from '../../redux/thunk/user';
import UsersListItem from '../UsersList/UsersListItem';
import UserCardModal from '../UserCardModal/UserCardModal';

function MainAuth() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getfetchUsersList());
  }, [dispatch]);

  const { usersList } = useSelector((state) => state.usersListReducer);

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item sx={{ height: 400 }}>ЗДЕСЬ ДОЛЖНА БЫТЬ КАРУСЕЛЬ</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
            <Item xs={4}>xs=4</Item>
            <Item xs={4}>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Container>
      <UserCardModal openModal={openModal} setOpenModal={setOpenModal} user={userState} />
    </>
  );
}

export default MainAuth;
