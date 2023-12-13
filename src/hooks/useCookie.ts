/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// хз чому але eslint кричить на бібліотеку 
import { useState } from 'react';
import Cookies from 'universal-cookie';

export const useCookie = () => {
  const cookie = new Cookies(null, { path:'/' });

  const [value, setValue] = useState<string | null>(null);
  
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
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};

export default useCookie;