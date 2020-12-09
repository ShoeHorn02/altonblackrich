import {
  ELEMENT_LOADING,
  ELEMENT_LOADED
} from './types';


// ELEMENT LOADING
export const elementLoading = () => (dispatch, getState) => {
  // element loading
  dispatch({ type: ELEMENT_LOADING });

};

// ELEMENT LOADED
export const elementLoaded = () => (dispatch, getState) => {
  // element loaded
  dispatch({ type: ELEMENT_LOADED });

};
