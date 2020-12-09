import axios from 'axios';
import { returnErrors } from './messages';
import store from "../store/index";
import { reactivateUser } from './social';
import { API_USER, API_LOGIN, API_REGISTER, API_LOGOUT, API_USER_PROFILES} from './API'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FLAG,
} from './types';


// CHECK TOKEN & LOAD USER

export const loadUser = () => async (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  await axios
    .get(`${API_USER}`, keyConfig(getState))
    .then((res) => {
      dispatch({type: USER_LOADED, payload: res.data,});
      store.dispatch(reactivateUser("true"));

    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};



// CHECK TOKEN & LOAD USER

export const loadUserSocial = () => async (dispatch, getState) => {


  await axios
    .get(`${API_USER}`, keyConfig(getState))
    .then((res) => {
      dispatch({type: USER_LOADED, payload: res.data,});
      //store.dispatch(deactivateUser(res.data.pk, "true"));

    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};



// LOGIN USER
export const login = (email, password) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = await JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${API_LOGIN}`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    return res
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data
    });
    return err
  }
};

// REGISTER USER
export const register = ({ email, password1, password2 }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request Body
  const body = await JSON.stringify({ email, password1, password2 });
  try {
    const res = await axios.post(`${API_REGISTER}`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    return res
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data
    });
    return err
  }
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${API_LOGOUT}`, null, keyConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with key - helper function
export const keyConfig = (getState) => {
  // Get key from state
  const key = getState().auth.key;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If key, add to headers config
  if (key) {
    config.headers['Authorization'] = `Token ${key}`;
  }

  return config;
};




// Login Flag
export const loginFlag = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: LOGIN_FLAG });

};




export const onboardComplete = (user_id_xref, onboarding_complete) => (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({onboarding_complete  });
  axios.patch(`${API_USER_PROFILES}${user_id_xref}/`, body, keyConfig(getState))

};
