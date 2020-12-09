
import axios from 'axios';
import { returnErrors } from './messages';
import {
  API_ENROLLMENT_HISTORY,
  API_ENROLLMENT_HISTORY_RESUME_DATE,
 }
 from './API'
import { keyConfig } from './auth'

import {
  ENROLL_SUCCESS,
  ENROLL_FAIL,
  ENROLL_COMPLETE_SUCCESS,
  ENROLL_COMPLETE_FAIL,
  ENROLL_RESUME_SUCCESS,
  ENROLL_RESUME_FAIL,
  CLEAR_POSTS,
} from './types';


// ENROLL USER IN WORKOUT
export const enrollUser = (routine_xref, user_id_xref, recorded_enroll_date) => (dispatch, getState) => {


  // Request Body
  const body = JSON.stringify({ routine_xref, user_id_xref, recorded_enroll_date });
  console.log(body)


  axios
    .post(`${API_ENROLLMENT_HISTORY}`, body, keyConfig(getState))
    .then((res) => {
      dispatch({
        type: ENROLL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ENROLL_FAIL,
      });
    });
};

// COMPLETE ENROLLMENT
export const completeEnroll = (routine_xref, user_id_xref, recorded_enroll_date, recorded_end_date, ended_workout, endedID) => (dispatch, getState) => {


  // Request Body
  const body = JSON.stringify({ routine_xref, user_id_xref, recorded_enroll_date, recorded_end_date, ended_workout });

  axios
    .put(`${API_ENROLLMENT_HISTORY}${endedID}/`, body, keyConfig(getState))
    .then((res) => {
      dispatch({
        type: ENROLL_COMPLETE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ENROLL_COMPLETE_FAIL,
      });
    });
};

// RESUME ENROLLMENT
export const resumeEnroll = (user_enrollment_history_xref, user_id_xref, resume_date) => (dispatch, getState) => {


  // Request Body
  const body = JSON.stringify({user_enrollment_history_xref, user_id_xref, resume_date});
  console.log(body)

  axios
    .post(`${API_ENROLLMENT_HISTORY_RESUME_DATE}`, body, keyConfig(getState))
    .then((res) => {
      dispatch({
        type: ENROLL_RESUME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: ENROLL_RESUME_FAIL,
      });
    });
};

// CLEAR POST REQUESTS
export const clearPosts = () => (dispatch, getState) => {

      dispatch({
        type: CLEAR_POSTS,
      });

};
