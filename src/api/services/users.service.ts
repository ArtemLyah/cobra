import { AxiosAdapter } from '../AxiosAdapter';
import { url } from '../urls';
import { UserList } from '../types/user';

class ApiUsers {
  async getAll (): Promise<UserList> {
    return AxiosAdapter.get<UserList>(url.GET_ALL_USERS).fetchData();
  }
}

export const apiUsers = new ApiUsers();