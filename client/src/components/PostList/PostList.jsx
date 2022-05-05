import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchGamesList } from '../../redux/thunk/getGame';
import { getFetchPostsList } from '../../redux/thunk/posts';
import PostMin from '../PostMin/PostMin';
import style from './PostList.module.css';

function PostList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFetchPostsList());
    dispatch(getFetchGamesList());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.postsReducer);
  const { games } = useSelector((state) => state.gamesListReducer);

  return (
    <div className={style.container}>
      {posts.map((post) => {
        return <PostMin key={post.id} post={post} games={games} />;
      })}
    </div>
  );
}

export default PostList;
