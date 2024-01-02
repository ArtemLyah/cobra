import { useState } from 'react';
import Cookies from 'universal-cookie';

export const useCookie = () => {
  const cookie = new Cookies(null, { path:'/' });

  const [value, setValue] = useState('');
  
  const setItem = (name: string, value: string) => {
    cookie.set(name, value, { path: '/' });
    setValue(value);
  };

  const getItem = (name: string) =>{
    const value = cookie.get(name);
    setValue(value);

    return value;
  };

  const removeItem = (name: string) =>{
    cookie.remove(name);
    setValue('');
  };

  return { value, setItem, getItem, removeItem };
};

export default useCookie;