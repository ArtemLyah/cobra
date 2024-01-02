import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCookie } from './useCookie';
import { User } from '../types/user.type';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useCookie();

  const addUser = (user: User) => {
    setUser(user);
    setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };
  
  return { user, addUser, removeUser, setUser };

};

export default useUser;