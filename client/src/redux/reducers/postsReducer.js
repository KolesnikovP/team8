/* eslint-disable default-param-last */
const INIT_POSTS = 'INIT_POSTS';
const ADD_POST = 'ADD_POST';

const initialState = { posts: [] };

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_POSTS:
      return { ...state, posts: [action.payload] };
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export const getAllPostsAC = (payload) => ({ type: INIT_POSTS, payload });
export const addNewPostAC = (payload) => ({ type: ADD_POST, payload });
