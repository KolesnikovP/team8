/* eslint-disable default-param-last */
const INIT_CHAT = 'INIT_CHAT';

const initionalState = { chats: [] };

export const userChatReducer = (state = initionalState, action) => {
  switch (action.type) {
    case INIT_CHAT:
      return { ...state, chats: action.payload };
    default:
      return state;
  }
};

export const initUserChatAction = (payload) => ({ type: INIT_CHAT, payload });
