import React, { useEffect, useState } from 'react';
import { apiUsers } from './api/services/users';
import { User } from './api/types/users';
import PresentationPage from './pages/presentation/presentation.page';

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
    </li>
  );

  return (
    <React.StrictMode>
      <PresentationPage/>
    </React.StrictMode>
  );
};

export default App;
