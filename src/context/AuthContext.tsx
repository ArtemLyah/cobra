import React, { useEffect } from 'react';
import  { createContext, PropsWithChildren, useState } from 'react';
import { authService } from '../api/services/auth.service';
import { UserPayload } from '../api/types/user.type';
import useCookie from '../hooks/useCookie';

interface IAuthContext {
  auth: UserPayload | null;
  setAuth: (value: UserPayload | null) => void; 
  isCheckingAuth: boolean,
}

export const AuthContext = createContext<IAuthContext>({
  auth: null,
  isCheckingAuth: true,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [ isCheckingAuth, setIsCheckingAuth ] = useState(true);
  const [ auth, setAuth ] = useState<UserPayload | null>(null);
  const { token } = useCookie();

  useEffect(() => {
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