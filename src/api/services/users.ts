import axios from 'axios';
import * as urls from '../../utils/urls';
import { User } from '../types/users';

class ApiUsers {
  async getAll (): Promise<User[]> {
    const res = await axios.get(urls.GET_ALL_USERS);
    return res.data.users as User[];
  }
}

export const apiUsers = new ApiUsers();