import { AxiosAdapter } from '../AxiosAdapter';
import { url } from '../urls';
import { useAuthorisation } from '../utils';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { AccessToken } from '../types/access_token.type';
import { UserPayload } from '../types/user.type';

class AuthService {
  async register (register: RegisterDTO): Promise<AccessToken> {
    return AxiosAdapter.post<RegisterDTO, AccessToken>(url.REGISTER, register).fetchData();
  }
  
  async login (login: LoginDTO): Promise<AccessToken> {
    return AxiosAdapter.post<LoginDTO, AccessToken>(url.LOGIN, login).fetchData();
  } 
  
  async verifyToken (token: string): Promise<UserPayload> {
    return AxiosAdapter.get<UserPayload>(url.VERIFY_TOKEN, useAuthorisation(token)).fetchData();    
  }
  
  async updateToken (token: string): Promise<AccessToken> {
    return AxiosAdapter.get<AccessToken>(url.UPDATE_TOKEN, useAuthorisation(token)).fetchData();    
  }
}

export const authService = new AuthService();