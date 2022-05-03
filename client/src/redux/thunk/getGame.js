import { getAllGamesAC } from '../reducers/gamesListReducer';

export const getFetchGamesList = () => {
  return (dispatch) => {
    fetch('http://localhost:4000/api/addPost')
      .then((response) => response.json())
      .then((data) => dispatch(getAllGamesAC(data)))
      .catch((err) => console.log(err));
  };
};
