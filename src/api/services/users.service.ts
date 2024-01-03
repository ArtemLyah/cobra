import { AxiosAdapter } from '../AxiosAdapter';
import { url } from '../urls';
import { User } from '../types/user';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { OkMessage } from '../types/okMessage';
import { UserUpdatePasswordDTO } from '../dtos/user.update.password.dto';

class UserService {
  async get (token: string): Promise<User> {
    return AxiosAdapter.get<User>(url.GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).fetchData();
  }
  
  async update (token: string, data: UserUpdateDTO): Promise<User> {
    return AxiosAdapter.patch<UserUpdateDTO, User>(url.UPDATE_USER, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).fetchData();
  }
  
  async updatePassword (token: string, data: UserUpdatePasswordDTO): Promise<OkMessage> {
    return AxiosAdapter.patch<UserUpdatePasswordDTO>(url.UPDATE_PASSWORD_USER, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).fetchData();
  }
  
  async deleteAccount (token: string): Promise<OkMessage> {
    return AxiosAdapter.delete(url.GET_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).fetchData();
  }
}

export const userService = new UserService();