import { getAllPostsAC, addNewPostAC } from '../reducers/postsReducer';

export const getFetchPostsList = () => {
  return (dispatch) => {
    fetch('http://localhost:4000/api/initPosts')
      .then((response) => response.json())
      .then((data) => dispatch(getAllPostsAC(data)))
      .catch((err) => console.log(err));
  };
};

export const addNewPostFetch = (post) => {
  return (dispatch) => {
    console.log(post);
    fetch('http://localhost:4000/api/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addNewPostAC(data)))
      .catch((err) => console.log(err));
  };
};

export const delPost = (id) => {
  return (dispatch) => {
    console.log(post);
    fetch('http://localhost:4000/api/delPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addNewPostAC(data)))
      .catch((err) => console.log(err));
  };
};
