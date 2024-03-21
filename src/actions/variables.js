import { CHANGEVARIABLE } from './type';

export const changeVariable = (key, value) => ({
  type: CHANGEVARIABLE,
  payload: { key, value },
});

export const productionFlag = false;


// USER API ENDPOINTS
export const REGISTER_URL = "https://claw-backend.onrender.com/api/v1/client/register";
export const PHONE_VERIFY_URL = 'https://claw-backend.onrender.com/api/v1/client/verify';
export const USER_PROFILE_URL = "https://claw-backend.onrender.com/api/v1/client/auth/me";

// LEGALGPT ENDPOINTS

export const NEW_USER_URL = "https://claw-backend.onrender.com/api/v1/gpt/user";
export const NEW_SESSION_URL = "https://claw-backend.onrender.com/api/v1/gpt/session/";
export const NEW_MESSAGE_URL = "https://claw-backend.onrender.com/api/v1/gpt/session/prompt";
export const RETREIVE_SESSIONS = "https://claw-backend.onrender.com/api/v1/gpt/sessions/legalGPT";
export const RETREIVE_MESSAGES = "https://claw-backend.onrender.com/api/v1/gpt/session/";

// NEWS ENDPOINT

export const NEWS_URL = "https://claw-backend.onrender.com/api/v1/news";