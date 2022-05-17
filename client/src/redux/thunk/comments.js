import { addCommentsAC, initCommentsAC } from '../reducers/commentsReducer';

export const getCommentList = () => {
  return (dispatch) => {
    fetch('https://team8elbrus.herokuapp.com/api/initComments')
      .then((response) => response.json())
      .then((data) => dispatch(initCommentsAC(data)))
      .catch((err) => console.log(err));
  };
};

export const addNewComment = (post, id) => {
  return (dispatch) => {
    fetch(`https://team8elbrus.herokuapp.com/api/addComments/${post}/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(addCommentsAC(data)))
      .catch((err) => console.log(err));
  };
};
