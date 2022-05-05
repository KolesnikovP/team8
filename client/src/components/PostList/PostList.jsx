import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material';
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
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography>Никнейм</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Описание</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Игра</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Кол-во часов</Typography>
        </Grid>
        {posts.map((post) => (
          <PostMin key={post.id} post={post} games={games} />
        ))}
      </Grid>
    </Container>
  );
}

export default PostList;
