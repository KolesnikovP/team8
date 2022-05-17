import { getAllGamesAC } from '../reducers/gamesListReducer';

export const getFetchGamesList = () => {
  return (dispatch) => {
    fetch('https://team8elbrus.herokuapp.com/api/initGames')
      .then((response) => response.json())
      .then((data) => dispatch(getAllGamesAC(data)))
      .catch((err) => console.log(err));
  };
};
