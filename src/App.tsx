import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuComponent from './components/menu';
import { Outlet } from 'react-router';
import Footer from './components/footer/footer';
        
export const App = () => {
  return (
    <React.StrictMode>
      <MenuComponent/>
      <Outlet/>
      <Footer/>
    </React.StrictMode>
  );
};

export default App;
