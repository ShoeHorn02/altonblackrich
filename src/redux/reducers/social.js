import {
  USER_LOADING,
  USER_LOADED,
} from '../actions/types';

const initialState = {
  key: localStorage.getItem('key'),
  isLoading: false,
  loginFlag: false,
  isAuthenticated: null,
  user: null,
  error: null
};


export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    default:
      return state;
  }
}
