import React, { ReactElement } from 'react';
import { Outlet, RouteObject } from 'react-router';
import Footer from '../components/footer/footer';
import Menu from '../components/menu';
import RequireAuth from '../components/RequireAuth';

interface PageBuilderProps {
  page: ReactElement;
  path: string;
  menu?: boolean;
  footer?: boolean;
  requireAuth?: boolean;
}

const PageBuilder = (props: PageBuilderProps): RouteObject => {
  const element = <>
    { props.menu ? <Menu/> : '' }
    { props.page }
    { props.footer ? <Footer/> : '' }
  </>;

  return { 
    path: props.path, 
    element: props.requireAuth ? <RequireAuth/> : <Outlet/>,
    children: [
      { path: props.path, element: element },
    ],
  };
};
 
export default PageBuilder;