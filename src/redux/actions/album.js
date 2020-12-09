
import axios from 'axios';
import {
  API_USER_PHOTOS_ALBUMS,
  API_USER_PHOTOS_PHOTOS,
  API_USER_PHOTOS_PHOTOS_LIKES,
  API_USER_PHOTOS_PHOTOS_COMMENTS
 }
 from './API'
import { keyConfig } from './auth'


// Setup config with key - helper function
export const keyConfigImage = (getState) => {
  // Get key from state
  const key = getState().auth.key;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  // If key, add to headers config
  if (key) {
    config.headers['Authorization'] = `Token ${key}`;
  }


  return config;
};



// ALBUM NAME AND DESC
export const postAlbumName = (user_id_xref, album_name, description, publish_to_timeline, active) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({user_id_xref, album_name, description, publish_to_timeline, active  });
  const res = await axios.post(`${API_USER_PHOTOS_ALBUMS}`, body, keyConfig(getState))
  return res

};


// CHANGE BIRTHDAY
export const postPhotoToAlbum = (user_id_xref, album_xref, photo) => async (dispatch, getState) => {

  // Request Body
  let form_data = await new FormData();
  await form_data.append('photo', photo, photo.name);
  await form_data.append('album_xref', album_xref);
  await form_data.append('user_id_xref', user_id_xref);
  await form_data.append('active', 'true');
  const res = await axios.post(`${API_USER_PHOTOS_PHOTOS}`, form_data, keyConfigImage(getState))
  return await res


};

// DELETE ALBUM
export const deleteAlbumName = (user_id_xref, album_name, active) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({active  });
  const res = await axios.patch(`${API_USER_PHOTOS_ALBUMS}${album_name}/`, body, keyConfig(getState))
  return res

};

// DELETE ALBUM
export const updateAlbumName = (album_id, album_name, description, is_private, publish_to_timeline) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({album_name, description, is_private, publish_to_timeline  });
  const res = await axios.patch(`${API_USER_PHOTOS_ALBUMS}${album_id}/`, body, keyConfig(getState))
  return res

};


// DELETE PHOTO
export const deletePhoto = (user_id_xref, photoID, active) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({active  });
  const res = await axios.patch(`${API_USER_PHOTOS_PHOTOS}${photoID}/`, body, keyConfig(getState))
  return res

};


// POST LIKE
export const postPhotoLike = (photo_xref, liking_user_id_xref ) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({ photo_xref, liking_user_id_xref  });
  const res = await axios.post(`${API_USER_PHOTOS_PHOTOS_LIKES}`, body, keyConfig(getState))
  return res

};


// POST COMMENT
export const postPhotoCommment = (photo_xref, commenting_user_id_xref, comment) => async (dispatch, getState) => {

  // Request Body
  const body = JSON.stringify({photo_xref, commenting_user_id_xref, comment  });
  const res = await axios.post(`${API_USER_PHOTOS_PHOTOS_COMMENTS}`, body, keyConfig(getState))
  return res

};



// Remove Comment
export const deletePhotoCommment = (id, deleted, deleted_time) => async (dispatch, getState) => {

  // Request Body
  const body = await JSON.stringify({id, deleted, deleted_time  });
  const res = await axios.patch(`${API_USER_PHOTOS_PHOTOS_COMMENTS}${id}/`, body, keyConfig(getState))
  return res

};
