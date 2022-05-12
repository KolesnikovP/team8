const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COM = 'ADD_COM';

const initialState = { comments: [] };

// eslint-disable-next-line default-param-last
export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_COMMENTS:
      return { ...state, comments: action.payload };
    case ADD_COM:
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
};

export const initCommentsAC = (payload) => ({ type: INIT_COMMENTS, payload });
export const addCommentsAC = (payload) => ({ type: ADD_COM, payload });
