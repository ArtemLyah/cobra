import React, { useEffect, useState } from 'react';
import { apiUsers } from './api/services/users';
import { User } from './api/types/users';

export const App = () => {
  const [users, setUsers] = useState([] as User[]);

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
    <React.StrictMode>
      <div className="App">
        <p>List of users</p>
        { renderedUsers }
      </div>
    </React.StrictMode>
  );
};

export default App;
