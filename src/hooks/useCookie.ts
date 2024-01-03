import Cookies from 'universal-cookie';

export const useCookie = () => {
  const cookie = new Cookies(null, { path:'/' });

  const setItem = (name: string, value: string) => {
    cookie.set(name, value, { path: '/' });
  };

  const getItem = (name: string) =>{
    return cookie.get(name);
  };

  const removeItem = (name: string) =>{
    cookie.remove(name);
  };

  return { setItem, getItem, removeItem };
};

export default useCookie;