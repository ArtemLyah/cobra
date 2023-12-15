import React from 'react';
import { Menu } from './components/menu.jsx';
import { Outlet } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => {
  return (
    <>
      <Menu />
      <Outlet/>
    </>
  );
};

export default App;
