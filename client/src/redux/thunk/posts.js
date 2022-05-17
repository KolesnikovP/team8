import { getAllPostsAC, addNewPostAC, delPostAC } from '../reducers/postsReducer';

export const getFetchPostsList = () => {
  return (dispatch) => {
    fetch('https://team8elbrus.herokuapp.com/api/initPosts')
      .then((response) => response.json())
      .then((data) => dispatch(getAllPostsAC(data)))
      .catch((err) => console.log(err));
  };
};

export const addNewPostFetch = (post) => {
  return (dispatch) => {
    fetch('https://team8elbrus.herokuapp.com/api/addPost', {
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
    fetch(`https://team8elbrus.herokuapp.com/api/delPost/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => dispatch(delPostAC(data.id)))
      .catch((err) => console.log(err));
  };
};
