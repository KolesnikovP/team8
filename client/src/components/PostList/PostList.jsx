import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Grid, IconButton, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
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

  return (
    <Container>
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
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <Typography>Взаимодействие</Typography>
        </Grid>
      </Grid>
      {posts.map((post) => (
        <PostMin key={post.id} post={post} games={games} />
      ))}
    </Container>
  );
}

export default PostList;
