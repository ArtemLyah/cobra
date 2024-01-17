import { AxiosAdapter } from '../AxiosAdapter';
import { url } from '../urls';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { UserUpdatePasswordDTO } from '../dtos/user.update.password.dto';
import { UserResponse } from '../responses/user.response';
import { OkResponse } from '../responses/ok.response';
import { useAuthorisation } from '../utils';

class UserService {
  async get (token: string): Promise<UserResponse> {
    return AxiosAdapter.get<UserResponse>(url.GET_USER, useAuthorisation(token)).fetchData();
  }
  
  async update (token: string, data: UserUpdateDTO): Promise<UserResponse> {
    return AxiosAdapter.patch<UserUpdateDTO, UserResponse>(
      url.UPDATE_USER, 
      data, 
      useAuthorisation(token)
    ).fetchData();
  }
  
  async updatePassword (token: string, data: UserUpdatePasswordDTO): Promise<OkResponse> {
    return AxiosAdapter.patch<UserUpdatePasswordDTO>(
      url.UPDATE_PASSWORD_USER, 
      data,
      useAuthorisation(token)
    ).fetchData();
  }
  
  async deleteAccount (token: string): Promise<OkResponse> {
    return AxiosAdapter.delete(url.GET_USER, useAuthorisation(token)).fetchData();
  }
}

export const userService = new UserService();