import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from './components/menu';
import { Outlet } from 'react-router';

export const App = () => {
  return (
    <React.StrictMode>
      <MenuComponent/>
      <Outlet/>
    </React.StrictMode>
  );
};

export default App;
