import React, { useState } from 'react';
import SignUpButton from './buttons/SignUpButton';
import LogInButton from './buttons/LogInButton';
import ProfileDropdown from './dropdown/ProfileDropdown';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './styles/Menu.css';

const Menu = () => {
  const [ active, setActive ] = useState(false);
  const { logout } = useAuth();

  const { auth } = useAuth();
  const handleClick = () => setActive(!active);

  let classNames = 'main-nav-div';
  if (active) {
    classNames += ' active';
  }

  const user = true;

  return (
    <>
      <nav className='nav-bar'>
        <li className='nav-logo'>
          <Link to='/'>
            <img src={require('./logo/logo.png')} alt='CodeBranch logo' className='logo' />
          </Link>
          <i className="bars fa-solid fa-bars" onClick={handleClick} />
        </li>
        <div className={classNames}>
          <div className='nav-links'>
            <li className='nav-item'>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/roadmaps/editor' >Create roadmap</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/about' >About</NavLink>
            </li>
          </div>
          { user ? 
            <div id='profile-dropdown'>
              <ProfileDropdown title={ auth?.userId ? auth?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }>
                <div className='profile-links'>
                  <Link to='/profile'>My Profile</Link>
                  <Link to='/'>My Maps</Link>
                  <Link to='/presentation' onClick={logout} >Log Out</Link>
                </div>
              </ProfileDropdown>
            </div>
            :
            <div className='nav-btns'>
              <li className='nav-btn'>
                <SignUpButton />
              </li>
              <li className='nav-btn'>
                <LogInButton />
              </li>
            </div>
          }
        </div>
      </nav>
    </>
  );
};

export default Menu;