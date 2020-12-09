
import axios from 'axios';
import { returnErrors } from './messages';
import {
  API_EXERCISE_TRACKER,
  API_ONE_REP_MAX_TRACKER
} from './API'
import { keyConfig } from './auth'

import {

} from './types';


// ENROLL USER IN WORKOUT
export const exerciseTracker = (
  rep_count,
  weight,
  weight_level,
  session_day,
  recorded_start_time,
  user_id_xref,
  user_enrollment_history_xref,
  workout_day_xref,
  duration_xref,
  exercise_xref,
  set_xref
  ) => (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({ rep_count, weight, weight_level, session_day, recorded_start_time, user_id_xref, user_enrollment_history_xref, workout_day_xref, duration_xref, exercise_xref, set_xref });
  console.log(body)
  axios
    .post(`${API_EXERCISE_TRACKER}`, body, keyConfig(getState))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};



// ONE REP MAX TRACKER
export const exerciseTrackerOneRepMax = (
  weight,
  user_id_xref,
  user_enrollment_history_xref,
  exercise_xref
  ) => (dispatch, getState) => {



  // Request Body
  const body = JSON.stringify({ weight, user_id_xref, user_enrollment_history_xref, exercise_xref});
  console.log(body)
  axios
    .post(`${API_ONE_REP_MAX_TRACKER}`, body, keyConfig(getState))
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
