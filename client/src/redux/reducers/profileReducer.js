const INIT_PROFGAMES = 'INIT_PROFGAMES';

const initialState = { profGames: [] };

// eslint-disable-next-line default-param-last
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PROFGAMES:
      return { ...state, profGames: action.payload };
    default:
      return state;
  }
};
export const setProfileGames = (payload) => ({ type: INIT_PROFGAMES, payload });
