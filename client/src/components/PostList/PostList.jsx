/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import { getFetchPostsList } from '../../redux/thunk/posts';
import PostMin from '../PostMin/PostMin';

function PostList({ handleClickOpenChat, getId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFetchPostsList());
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const [sortedPosts, setSortedPosts] = useState(null);
  const { posts } = useSelector((state) => state.postsReducer);
  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);

  const { games } = useSelector((state) => state.gamesListReducer);
  const options = [];
  games.map((game) => options.push(game.gameSteamName));
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (value === '' || value === null) {
      setSortedPosts(posts);
    } else {
      setSortedPosts(posts.filter((a) => a.gameName === value));
    }
  }, [value]);

  const [hoursValue, setHoursValue] = React.useState('');

  const handleSortHours = (event, methodSort) => {
    if (methodSort === 'asc') {
      setSortedPosts([...sortedPosts].sort((a, b) => b.userHours - a.userHours));
      setHoursValue(methodSort);
    } else {
      setSortedPosts([...sortedPosts].sort((a, b) => a.userHours - b.userHours));
      setHoursValue(methodSort);
    }
  };

  const [createdValue, setCreatedValue] = React.useState('');

  const handleSortCreated = (event, methodSort) => {
    if (methodSort === 'asc') {
      setSortedPosts([...sortedPosts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      setCreatedValue(methodSort);
    } else {
      setSortedPosts([...sortedPosts].sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
      setCreatedValue(methodSort);
    }
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      {/* <Box sx={{ marginBottom: '2rem' }}>
        
      </Box> */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Игрок</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Описание</Typography>
        </Grid>
        <Grid item xs={2}>
          {
            /* <Typography sx={{ textAlign: 'left' }}>Игра</Typography> */
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={options}
              sx={{ width: 150 }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} label="Все игры" />}
            />
          }
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Кол-во часов</Typography>
          <ToggleButtonGroup
            value={hoursValue}
            exclusive
            onChange={handleSortHours}
            sx={{ height: '20px' }}
          >
            <ToggleButton value="asc">
              <KeyboardArrowUpIcon />
            </ToggleButton>
            <ToggleButton value="down">
              <KeyboardArrowDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Взаимодействие</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Дата создания</Typography>
          <ToggleButtonGroup
            value={createdValue}
            exclusive
            onChange={handleSortCreated}
            sx={{ height: '20px' }}
          >
            <ToggleButton value="asc">
              <KeyboardArrowUpIcon />
            </ToggleButton>
            <ToggleButton value="down">
              <KeyboardArrowDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ marginBottom: '2rem' }} />
      {sortedPosts?.length ? (
        sortedPosts?.map((post) => (
          <PostMin
            getId={getId}
            key={post.id}
            post={post}
            handleClickOpenChat={handleClickOpenChat}
          />
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', marginBottom: '2rem' }} variant="h5">
          В данный момент никто не ищет тиммейтов
        </Typography>
      )}
    </Container>
  );
}

export default PostList;
