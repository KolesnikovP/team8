/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import { getFetchPostsList } from '../../redux/thunk/posts';
import PostMin from '../PostMin/PostMin';

function PostList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFetchPostsList());
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.postsReducer);
  const { games } = useSelector((state) => state.gamesListReducer);
  const options = [];
  games.map((game) => options.push(game.gameSteamName));
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  let postsDouble = [...posts];
  function sortPost(method) {
    if (method === '' || method === null) {
      console.log(postsDouble);
      // postsDouble = [...posts];
    } else {
      console.log(postsDouble.filter((a) => a.gameName === method));
      // postsDouble = postsDouble.filter((a) => a.gameName === method);
    }
  }
  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          sortPost(newInputValue);
        }}
        options={options}
        sx={{ width: 300 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Все игры" />}
      />
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Typography>Игрок</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Описание</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Игра</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Кол-во часов</Typography>
          {/* <IconButton>
            <FilterListIcon />
          </IconButton> */}
        </Grid>
        <Grid item xs={1}>
          <Typography>Взаимодействие</Typography>
        </Grid>
      </Grid>
      {postsDouble.map((post) => (
        <PostMin key={post.id} post={post} />
      ))}
    </Container>
  );
}

export default PostList;
