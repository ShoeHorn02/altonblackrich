import {
  ELEMENT_LOADING,ELEMENT_LOADED
} from '../actions/types';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ELEMENT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      case ELEMENT_LOADED:
        return {
          ...state,
          isLoading: false,
        };
    default:
      return state;
  }
}
