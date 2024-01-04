import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router';
import './styles/app.css';


export const App = () => {
  return (
    <>
      <Outlet/>
    </>
  );
};

export default App;
