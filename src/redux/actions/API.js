let DEBUG = false;
let HOST_URL = "https://backend.wordcounter.lol/api/v1";
let MEDIA_URL = "https://backend.wordcounter.lol/media/";
let WEB_SOCKET_URL = "wss://backend.wordcounter.lol";
if (DEBUG) {
  HOST_URL = "http://localhost:8000/api/v1";
  MEDIA_URL = "http://localhost:8000/media/";
  WEB_SOCKET_URL = "ws://localhost:8000";
}



// BASE URL
export const API_BASE_URL = HOST_URL;
export const API_BASE_MEDIA_URL = MEDIA_URL;
export const SOCKET_URL = WEB_SOCKET_URL;


// AUTHENTICATION
export const API_USER = `${API_BASE_URL}/rest-auth/user`;
export const API_LOGIN = `${API_BASE_URL}/rest-auth/login/`;
export const API_REGISTER = `${API_BASE_URL}/rest-auth/registration/`;
export const API_LOGOUT = `${API_BASE_URL}/rest-auth/logout/`;
export const API_CHANGE_PWD = `${API_BASE_URL}/rest-auth/password/change/`;


// USER
export const API_USER_AVATAR = `${API_BASE_URL}/user_avatar/`;

// EXERCISES
export const API_EXERCISE_LIST = `${API_BASE_URL}/exercises_detail`;

// ENROLLMENT HISTORY
export const API_ENROLLMENT_HISTORY = `${API_BASE_URL}/enrollment_history/`;
export const API_ENROLLMENT_HISTORY_RESUME_DATE = `${API_BASE_URL}/enrollment_history_resume_date/ `;

// WORKOUTS
export const API_WORKOUTS_DETAIL = `${API_BASE_URL}/workouts_detail/`;
export const API_WORKOUTS_CATEGORY = `${API_BASE_URL}/workouts_category/`;
export const API_WORKOUTS_CATEGORY_PUBLIC = `${API_BASE_URL}/workouts_category_public/`;
export const API_WORKOUTS_POPULAR = `${API_BASE_URL}/dashboard_popular_workouts/`;


// DASHBOARD
export const API_DASHBOARD_GRAPH = `${API_BASE_URL}/dashboard_graph/`;
export const API_DASHBOARD_TABLE = `${API_BASE_URL}/dashboard_table/`;
export const API_DASHBOARD_TYCD = `${API_BASE_URL}/dashboard_things_you_can_do/`;
export const API_DASHBOARD_PW = `${API_BASE_URL}/dashboard_popular_workouts/`;

// LIFT TRACKER
export const API_LIFT_TRACKER_INPUT = `${API_BASE_URL}/lift_tracker_input/`;
export const API_EXERCISE_TRACKER = `${API_BASE_URL}/exercise_tracker/`;
export const API_ONE_REP_MAX_TRACKER = `${API_BASE_URL}/exercise_one_rep_max_tracker_all/`;

// LANDING
export const API_LANDING_INSTAGRAM_PUBLIC = `${API_BASE_URL}/instagram_public/`;

// REPORTS
export const API_REPORTS_LIFT_HISTORY = `${API_BASE_URL}/reports_lift_history/`;

// TIMELINE
export const API_TIMELINE = `${API_BASE_URL}/timeline/`;
export const API_TIMELINE_ALL_USER = `${API_BASE_URL}/timeline_all_user/?user_id_xref=`;
export const API_TIMELINE_ALL_USER_NORM = `${API_BASE_URL}/timeline_all_user/`;
export const API_TIMELINE_YOU_AND_FOLLOWING = `${API_BASE_URL}/timeline_you_and_following/`;
export const API_TIMELINE_LIKES = `${API_BASE_URL}/timeline_likes/`;
export const API_TIMELINE_COMMENTS = `${API_BASE_URL}/timeline_comments/`;

// PROFILES
export const API_DISCOVER_PROFILES = `${API_BASE_URL}/discover_profiles/`;
export const API_USER_PROFILES = `${API_BASE_URL}/user_profiles/`;
export const API_USER_PROFILES_FILTER = `${API_BASE_URL}/user_profiles/?id=`;
export const API_USER_PROFILES_SEARCH = `${API_BASE_URL}/user_profiles/?search=`;

// PROFILES: AVATAR PHOTO
export const API_USER_AVATAR_PHOTO = `${API_BASE_URL}/user_avatar_photo/`;
export const API_USER_AVATAR_PHOTO_MASTER = `${API_BASE_URL}/user_avatar_photo_master/`;

// PROFILES: FIRSTNAME LASTNAME
export const API_USER_FIRSTNAME_LASTNAME = `${API_BASE_URL}/user_firstname_lastname/`;
export const API_USER_HEADING = `${API_BASE_URL}/user_heading/`;

// PROFILES: BIRTHDAY
export const API_USER_BIRTHDAY = `${API_BASE_URL}/user_birthday/`;
export const API_BIRTHDAY_MONTH_CHOICES = `${API_BASE_URL}/birthday_month/`;
export const API_BIRTHDAY_YEAR_CHOICES = `${API_BASE_URL}/birthday_year/`;

// PROFILES: GENDER
export const API_USER_GENDER = `${API_BASE_URL}/user_gender/`;
export const API_GENDER_CHOICES = `${API_BASE_URL}/gender_list/`;

//PROFILES: LOCATION
export const API_USER_LOCATION = `${API_BASE_URL}/user_location/`;
export const API_USER_LOCATION_MASTER = `${API_BASE_URL}/user_location_master/`;
export const API_LOCATION_CITY = `${API_BASE_URL}/location_city/`;
export const API_LOCATION_REGION = `${API_BASE_URL}/location_region/`;
export const API_LOCATION_COUTNRY = `${API_BASE_URL}/location_country/`;

//PROFILES: IP
export const API_IP_SIGNUP= `${API_BASE_URL}/ip_signup/`;


//ALBBUMS
export const API_USER_PHOTOS_ALBUMS = `${API_BASE_URL}/albums/`;
export const API_USER_PHOTOS_ALBUMS_EMPTY = `${API_BASE_URL}/albums_no_photo/`;
export const API_USER_PHOTOS_ALBUMS_MASTER = `${API_BASE_URL}/albums_master/?user_id_xref=`;
export const API_USER_PHOTOS_ALBUMS_MASTER_NORMAL = `${API_BASE_URL}/albums_master/`;
export const API_USER_PHOTOS_PHOTOS = `${API_BASE_URL}/photos/`;
export const API_USER_PHOTOS_PHOTOS_MASTER = `${API_BASE_URL}/photos_master/`;
export const API_USER_PHOTOS_PHOTOS_LIKES = `${API_BASE_URL}/photos_likes/`;
export const API_USER_PHOTOS_PHOTOS_COMMENTS = `${API_BASE_URL}/photos_comments/`;


//FOLLOWING
export const API_USER_FOLLOWING = `${API_BASE_URL}/user_following/?user_id_xref=`;
export const API_USER_FOLLOWERS = `${API_BASE_URL}/user_followers/?followed_user=`;
export const API_USER_FOLLOWING_MASTER = `${API_BASE_URL}/user_following_master/`;
export const API_USER_FOLLOWING_MASTER_FILTER_OPEN = `${API_BASE_URL}/user_following_master_filter/`;

//BLOCKING
export const API_USER_BLOCK_MASTER = `${API_BASE_URL}/user_blocked/`;

//CHATS
export const API_CHATS = `${API_BASE_URL}/chat/`;
export const API_CHATS_RD = `${API_BASE_URL}/chat_rd/`;

//ONBOARDING IMAGES
export const API_ONBOARDING_IMAGES = `${API_BASE_URL}/onboarding_images/?onboarding_step=`;


//NOTIFICATIONS
export const API_NOTIFICATIONS_BELL = `${API_BASE_URL}/notification_flag/`;
export const API_NOTIFICATIONS_LONG = `${API_BASE_URL}/notification_long/`;
export const API_NOTIFICATIONS_SHORT = `${API_BASE_URL}/notification_short/`;
