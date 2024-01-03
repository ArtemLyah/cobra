import config from '../config/config';

class URL {
  API = `http://${config.API_URL}:${config.API_PORT}/api`;
  
  // users
  USERS = this.API + '/users';
  GET_ALL_USERS = this.USERS;
  
  // auth
  REGISTER = this.API + '/auth/register';
  LOGIN = this.API + '/auth/login';
  VERIFY_TOKEN = this.API + '/auth/verifyToken';
}

export const url = new URL();