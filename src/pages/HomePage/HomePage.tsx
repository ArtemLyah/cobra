import React, { useEffect, useState } from 'react';
import { apiUsers } from '../../api/services/users.service';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../../types/user.type';

const HomePage = () => {
  const [users, setUsers] = useState([] as User[]);
        
  const { user, setUser } = useAuth();
        
        
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
    </li>
  );

  return (
    <AuthContext.Provider value = {{ user, setUser }}>
      <React.StrictMode>
        <div className="App">
          <p>List of users</p>
          { renderedUsers }
        </div>
      </React.StrictMode>
    </AuthContext.Provider>  
  );
};

export default HomePage;