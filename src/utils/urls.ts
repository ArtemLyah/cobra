import config from '../config/config';

export const API = `http://${config.API_URL}:${config.API_PORT}/api`;

// users
export const USERS = API + '/users';
export const GET_ALL_USERS = USERS;