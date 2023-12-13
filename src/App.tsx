import React, { useEffect, useState, useContext } from 'react';
import { apiUsers } from './api/services/users';
import { User } from './api/types/users';
import { Menu } from './components/menu.jsx';
import { MenuLoggedIn } from './components/MenuLoggedIn';
import { MenuWithMaps } from './components/MenuWithMaps';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';

import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  const [users, setUsers] = useState([] as User[]);

  const { user, login, logout, setUser } = useAuth();


  const setDefaultUsers = async () => {
    const userList = await apiUsers.getAll();
    console.log(userList);
    setUsers(userList);
  };

  useEffect(() => {
    setDefaultUsers();
  }, []);

  const renderedUsers = users.map((user) => 
    <li key={ user.id }>
      <p>{ user.id }</p>
      <p>{ user.email }</p>
      <p>{ user.passwordHash }</p>
    </li>
  );

  return (
    <AuthContext.Provider value = {{ user, setUser }}>
      <React.StrictMode>
        <div className="App">
          <Menu/>
          
          <p>List of users</p>
          { renderedUsers }
        </div>
      </React.StrictMode>
    </AuthContext.Provider>  
  );
};

export default App;
