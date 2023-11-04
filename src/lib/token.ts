import { getCookie } from './cookie';

export const ACCESS_TOKEN_KEY = 'employee_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const getAccessToken = () => {
  try {
    return getCookie(ACCESS_TOKEN_KEY);
  } catch (err) {
    return null;
  }
};
