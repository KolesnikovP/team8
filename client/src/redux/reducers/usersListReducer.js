/* eslint-disable default-param-last */
const INIT_USERS = 'INIT_USERS';

const initialState = { usersList: [] };

export const usersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USERS:
      return { ...state, usersList: action.payload };
    default:
      return state;
  }
};

export const getUsersListAC = (payload) => ({ type: INIT_USERS, payload });
