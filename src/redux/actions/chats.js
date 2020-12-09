import axios from "axios";
import * as actionTypes from "./types";
import { API_CHATS } from './API'
import { keyConfig } from './auth'



export const addMessage = message => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  };
};

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

const getUserChatsSuccess = chats => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats
  };
};




// CHECK TOKEN & LOAD USER
export const getUserChats = () => (dispatch, getState) => {
  //

  axios
    .get(`${API_CHATS}`, keyConfig(getState))
    .then(res => dispatch(getUserChatsSuccess(res.data)));


};
