import { addCommentsAC, initCommentsAC } from '../reducers/commentsReducer';

export const getCommentList = () => {
  return (dispatch) => {
    fetch('http://localhost:4000/api/initComments')
      .then((response) => response.json())
      .then((data) => dispatch(initCommentsAC(data)))
      .catch((err) => console.log(err));
  };
};

export const addNewComment = (post, id) => {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/addComments/${post}/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(addCommentsAC(data)))
      .catch((err) => console.log(err));
  };
};
