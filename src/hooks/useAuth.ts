import { useContext } from 'react';
import { LoginDTO } from '../api/dtos/login.dto';
import { authService } from '../api/services/auth.service';
import AuthContext from '../context/AuthContext';
import useCookie from './useCookie';
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../api/types/user';
import { RegisterDTO } from '../api/dtos/register.dto';

export const useAuth = () => {
  const { auth, setAuth, isCheckingAuth } = useContext(AuthContext);
  const { setItem, removeItem } = useCookie();

  const login = async (data: LoginDTO, rememberMe=true) => {
    const response = await authService.login(data);
    rememberMe && setItem('token', response.access_token);
    setAuth(jwtDecode<UserAuth>(response.access_token));
    return response;
  };
  
  const signup = async (data: RegisterDTO, rememberMe=true) => {
    const response = await authService.register(data);
    rememberMe && setItem('token', response.access_token);
    setAuth(jwtDecode<UserAuth>(response.access_token));
    return response;
  };

  const clear = () => {
    setAuth({});
    removeItem('token');
  };

  return { auth, setAuth, isCheckingAuth, login, signup, clear };
};