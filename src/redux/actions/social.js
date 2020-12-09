import axios from 'axios';
import { returnErrors } from './messages';
import {
  API_USER_FOLLOWING_MASTER,
  API_USER_BLOCK_MASTER,
  API_USER_AVATAR_PHOTO,
  API_USER_AVATAR_PHOTO_MASTER,
  API_USER_FIRSTNAME_LASTNAME,
  API_USER_HEADING,
  API_USER_BIRTHDAY,
  API_USER_GENDER,
  API_USER_LOCATION,
  API_IP_SIGNUP,
  API_TIMELINE_LIKES,
  API_TIMELINE_COMMENTS,
  API_CHANGE_PWD,
  API_USER_PROFILES,
  API_USER,
  API_NOTIFICATIONS_BELL
 }
 from './API'
import { keyConfig } from './auth'

import {
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  CHANGE_NAME_SUCCESS,
  CHANGE_NAME_FAIL,
  CHANGE_HEADING_SUCCESS,
  CHANGE_HEADING_FAIL,
} from './types';





// FOLLOW A USER
export const followUser = (user_id_xref, followed_user) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({ user_id_xref, followed_user});
  const res = await axios.post(`${API_USER_FOLLOWING_MASTER}`, body, keyConfig(getState))
  return res

};

// BLOCK A USER
export const blockUser = (user_id_xref, blocked_user) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({ user_id_xref, blocked_user});
  console.log(body)
  const res = await axios.post(`${API_USER_BLOCK_MASTER}`, body, keyConfig(getState))
  return res
};


// UNBLOCK A USER
export const unblockUser = (id, unblocked, unblocked_time) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({ unblocked, unblocked_time});
  console.log(body)
  const res = await axios.patch(`${API_USER_BLOCK_MASTER}${id}/`, body, keyConfig(getState))
  return res
};


// UNFOLLOW A USER
export const unfollowUser = (id, unfollowed, unfollowed_time, user_id_xref, followed_user) => async (dispatch, getState) => {


  // Request Body
  const body = await JSON.stringify({id, unfollowed, unfollowed_time, user_id_xref, followed_user   });
  const res = await axios.put(`${API_USER_FOLLOWING_MASTER}${id}/`, body, keyConfig(getState))
  return res

};


// UPLOAD CROPPED PROFILE PHOTO
export const uploadPhoto = (user_id_xref, avatar_photo) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({user_id_xref, avatar_photo  });

  try {
    const res = await axios.post(`${API_USER_AVATAR_PHOTO}`, body, keyConfig(getState));
    dispatch({
      type: FOLLOW_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FOLLOW_FAIL,
      payload: err.response.data
    });
  }
};






// CHANGE FIRST AND LAST NAME
export const postFirstLastName = (user_id_xref, first_name, last_name) => (dispatch, getState) => {


  // Request Body
  const body = JSON.stringify({user_id_xref, first_name, last_name  });
  axios
    .post(`${API_USER_FIRSTNAME_LASTNAME}`, body, keyConfig(getState))
    .then((res) => {
      dispatch({
        type: CHANGE_NAME_SUCCESS,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CHANGE_NAME_FAIL,
      });
    });


  return 'completed'

};





// CHANGE HEADING
export const postHeading = (user_id_xref, heading) => async (dispatch, getState) => {


  // Request Body
  const body = JSON.stringify({user_id_xref, heading  });
  await axios.post(`${API_USER_HEADING}`, body, keyConfig(getState)).then((res) => {
      dispatch({
        type: CHANGE_HEADING_SUCCESS,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: CHANGE_HEADING_FAIL,
      });
    });

    return 'completed'

};




// CHANGE BIRTHDAY
export const postBirthday = (user_id_xref, month, year) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({user_id_xref, month, year  });
  const res = await axios.post(`${API_USER_BIRTHDAY}`, body, keyConfig(getState))
  return res

};


// CHANGE GENDER
export const postGender = (user_id_xref, gender) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({user_id_xref, gender  });
  const res = await axios.post(`${API_USER_GENDER}`, body, keyConfig(getState))
  return res

};



// CHANGE GENDER
export const postLocation = (user_id_xref, location_city) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({user_id_xref, location_city  });
  const res = await axios.post(`${API_USER_LOCATION}`, body, keyConfig(getState))
  return res

};



// UPLOAD CROPPED PROFILE PHOTO
export const removeAvatar = (user_id_xref, photo_id, hide) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({user_id_xref, photo_id, hide  });
  const res = await axios.patch(`${API_USER_AVATAR_PHOTO_MASTER}${photo_id}/`, body, keyConfig(getState))
  return res

};



// UPLOAD IP
export const postuserIP = (user_id_xref, ip_address) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({user_id_xref, ip_address  });
  const res = await axios.post(`${API_IP_SIGNUP}`, body, keyConfig(getState))
  return res

};


// UPLOAD Liked
export const timelineLikes = (timeline_xref, liking_user_id_xref) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({timeline_xref, liking_user_id_xref  });
  const res = await axios.post(`${API_TIMELINE_LIKES}`, body, keyConfig(getState))
  return res

};


// UPLOAD Comment
export const timelineComments = (timeline_xref, commenting_user_id_xref, comment) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({timeline_xref, commenting_user_id_xref, comment  });
  const res = await axios.post(`${API_TIMELINE_COMMENTS}`, body, keyConfig(getState))
  return res

};


// Remove Comment
export const timelineCommentsDelete = (id, deleted, deleted_time) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, deleted, deleted_time  });
  const res = await axios.patch(`${API_TIMELINE_COMMENTS}${id}/`, body, keyConfig(getState))
  return res

};

// Remove Comment
export const acccountPasswordChange = (old_password, new_password1, new_password2) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({old_password, new_password1, new_password2  });
  return await axios.post(`${API_CHANGE_PWD}`, body, keyConfig(getState)).then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });

};




// Remove Comment
export const deactivateUser = (id, active) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, active  });
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};


// Remove Comment
export const deleteUser = (id) => async (dispatch, getState) => {

  // Request Body
  const result = await axios.delete(`${API_USER_PROFILES}${id}/`, keyConfig(getState))
  return result

};


// Remove Comment
export const reactivateUser = (active) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({ active  });
  const result = await axios.patch(`${API_USER}/`, body, keyConfig(getState))
  return result

};




// CHECK TOKEN & LOAD USER

export const userFirstLastName = (id, first_name, last_name) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, first_name, last_name  });
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};


// CHECK TOKEN & LOAD USER
export const uploadAvatarPhoto = (id, avatar_image) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, avatar_image});
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};


// CHECK TOKEN & LOAD USER

export const postProfileHeading = (id, profile_heading) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, profile_heading});
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};



// PROFILE MEASUREMENT

export const postProfileMeasurement = (id, usa_imperial) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, usa_imperial});
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};


// Profile Location
export const postProfileLocation = (id, location_city) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, location_city  });
  const result = await axios.patch(`${API_USER_PROFILES}${id}/`, body, keyConfig(getState))
  return result

};



// Profile Location
export const notificationBell = (user_id_xref, event) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({user_id_xref, event  });
  const result = await axios.patch(`${API_NOTIFICATIONS_BELL}${user_id_xref}/`, body, keyConfig(getState))
  return result

};
