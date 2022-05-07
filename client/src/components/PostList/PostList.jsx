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

function PostList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFetchPostsList());
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const [sortedPosts, setSortedPosts] = useState('');
  const { posts } = useSelector((state) => state.postsReducer);
  useEffect(() => {
    setSortedPosts(posts);
  }, [posts]);
  // console.log(sortedPosts);

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

  const [alignment, setAlignment] = React.useState('');

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment === 'asc') {
      setSortedPosts([...sortedPosts].sort((a, b) => b.userHours - a.userHours));
      setAlignment(newAlignment);
    } else {
      setSortedPosts([...sortedPosts].sort((a, b) => a.userHours - b.userHours));
      setAlignment(newAlignment);
    }
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Box sx={{ marginBottom: '2rem' }}>
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
          sx={{ width: 300 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Все игры" />}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Игрок</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Описание</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Игра</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ textAlign: 'left' }}>Кол-во часов</Typography>
          <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
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
        </Grid>
      </Grid>
      <Box sx={{ marginBottom: '2rem' }}>
        {sortedPosts?.length && sortedPosts?.map((post) => <PostMin key={post.id} post={post} />)}
      </Box>
    </Container>
  );
}

export default PostList;
