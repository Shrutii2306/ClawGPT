import { CHANGEVARIABLE } from './type';

export const changeVariable = (key, value) => ({
  type: CHANGEVARIABLE,
  payload: { key, value },
});

export const productionFlag = false;
export const baseUrl = 'https://claw-einh.onrender.com/api/v1/';
export const verifyUrl = 'https://claw-backend.onrender.com/api/v1/user/verify';