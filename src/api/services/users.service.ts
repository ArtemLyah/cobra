import axios, { AxiosResponse } from 'axios';
import * as urls from '../../utils/urls';
import { User, UsersResponse } from '../../types/user.type';

class ApiUsers {
  async getAll (): Promise<User[]> {
    const res = await axios.get<any, AxiosResponse<UsersResponse>>(urls.GET_ALL_USERS);
    return res.data.users;
  }
}

export const apiUsers = new ApiUsers();