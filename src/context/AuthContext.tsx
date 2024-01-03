import React, { useEffect } from 'react';
import  { createContext, PropsWithChildren, useState } from 'react';
import { authService } from '../api/services/auth.service';
import { UserAuth } from '../api/types/user';
import useCookie from '../hooks/useCookie';

interface IAuthContext {
  auth: UserAuth;
  isCheckingAuth: boolean,
  setAuth: (value: UserAuth) => void; 
}

export const AuthContext = createContext<IAuthContext>({
  auth: {},
  isCheckingAuth: true,
  setAuth: (value: UserAuth) => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [ isCheckingAuth, setIsCheckingAuth ] = useState(true);
  const [ auth, setAuth ] = useState({});
  const { getItem } = useCookie();

  useEffect(() => {
    const token = getItem('token');
    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    const checkToken = async () => {
      const userAuth = await authService.verifyToken(token).catch(() => {});
      if (userAuth) {
        setAuth(userAuth);
      }
      setIsCheckingAuth(false);
    };

    checkToken();
  }, []);

  return ( 
    <AuthContext.Provider value={{ auth, setAuth, isCheckingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;