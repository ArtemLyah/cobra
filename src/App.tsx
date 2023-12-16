import React, { useEffect, useState } from 'react';
import { apiUsers } from './api/services/users';
import { User } from './api/types/users';
import PresentationPage from './pages/presentation/presentation.page';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <React.StrictMode>
      <PresentationPage/>
    </React.StrictMode>
  );
};

export default App;
