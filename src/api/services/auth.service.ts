import { AxiosAdapter } from '../AxiosAdapter';
import { url } from '../urls';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { AccessToken } from '../types/access_token';
import { UserAuth } from '../types/user';

class AuthService {
  async register (register: RegisterDTO): Promise<AccessToken> {
    return AxiosAdapter.post<RegisterDTO, AccessToken>(url.REGISTER, register).fetchData();
  }
  
  async login (login: LoginDTO): Promise<AccessToken> {
    return AxiosAdapter.post<LoginDTO, AccessToken>(url.LOGIN, login).fetchData();
  } 
  
  async verifyToken (token: string): Promise<UserAuth> {
    return AxiosAdapter.get<UserAuth>(url.VERIFY_TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).fetchData();    
  }
}

export const authService = new AuthService();