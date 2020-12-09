import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS, // added
  REGISTER_FAIL, // added
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_FLAG,
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
      // ...
      case REGISTER_SUCCESS: // added
      case LOGIN_SUCCESS:
        localStorage.setItem('key', action.payload.key);
        return {
          ...state,
          isLoading: false,
          loginFlag: true,
          isAuthenticated: true,
          ...action.payload
        };
      case AUTH_ERROR:
      case REGISTER_FAIL: // added
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          key: null,
          error: action.payload
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          key: null,
          error: action.payload
        };
      case LOGIN_FLAG:
        return {
          ...state,
          loginFlag: false,
        };
      case LOGOUT_SUCCESS:
        localStorage.removeItem('key');
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          key: null
        };
      // ...
    default:
      return state;
  }
}
