import {
  ENROLL_SUCCESS,
  ENROLL_FAIL,
  ENROLL_COMPLETE_SUCCESS,
  ENROLL_COMPLETE_FAIL,
  CLEAR_POSTS,
  ENROLL_RESUME_SUCCESS,
  ENROLL_RESUME_FAIL,
} from '../actions/types';

const initialState = {
  details: false,
  isSent: false,
  category: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ENROLL_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isSent: true,
      };
    case ENROLL_FAIL:
      return {
      ...state,
    };
    case ENROLL_RESUME_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isSent: true,
      };
    case ENROLL_RESUME_FAIL:
      return {
      ...state,
    };
    case ENROLL_COMPLETE_SUCCESS:
      return {
        ...state,
        details: action.payload,
        isSent: true,
      };
    case ENROLL_COMPLETE_FAIL:
      return {
      ...state,
    };
    case CLEAR_POSTS:
      return {
      isSent: false,
      details: false,
      ...state,
      };

    default:
      return state;
  }
}
