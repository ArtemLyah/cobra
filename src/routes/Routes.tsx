import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App }  from '../App';
import AboutPage from '../pages/AboutPage/AboutPage';
import HomePage from '../pages/HomePage/HomePage';
import FAQPage from '../pages/FAQPage/FAQPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'about', element: <AboutPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'home', element: <HomePage /> },
    ],
  },
]);