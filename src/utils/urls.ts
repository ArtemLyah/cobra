import config from '../config/config';

export const BASE = `http://${config.API_URL}:${config.API_PORT}/api`;

// users
export const USERS = BASE + '/users';
export const GET_ALL_USERS = USERS;