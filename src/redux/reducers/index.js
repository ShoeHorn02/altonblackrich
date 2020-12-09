import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import theme from "./themeReducer";

import { reducer as toastr } from "react-redux-toastr";

import errors from './errors';
import messages from './messages';
import auth from './auth';
import general from './general';
import workouts from './workouts';
import chats from './chats';
import nav from './nav';
//import social from './social';

export default combineReducers({
  sidebar,
  theme,
  toastr,
  workouts,
  general,
  messages,
  errors,
  auth,
  chats,
  nav,
});
