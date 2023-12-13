import { useEffect, useContext } from 'react';
import { useUser } from './useUser';
import { User } from './User';
import { useCookie } from './useCookie';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useCookie();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, setUser };
};

export default useAuth;