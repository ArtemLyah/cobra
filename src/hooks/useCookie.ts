import Cookies from 'universal-cookie';

export const useCookie = () => {
  const cookie = new Cookies(null, { path:'/' });

  const setItem = (name: string, value: string, path='/') => {
    cookie.set(name, value, { path });
  };

  const getItem = (name: string): string => {
    return cookie.get(name) ?? '';
  };

  const removeItem = (name: string) => {
    cookie.remove(name);
  };

  const token = getItem('token');

  return { token, setItem, getItem, removeItem };
};

export default useCookie;