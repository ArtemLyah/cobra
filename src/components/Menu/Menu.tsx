import React, { useState } from 'react';
import SignUpButton from './buttons/SignUpButton';
import LogInButton from './buttons/LogInButton';
import ProfileDropdown from './dropdown/ProfileDropdown';
import Dropdown from './dropdown/Dropdown';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './styles/Menu.css';

const Menu = () => {
  const [ active, setActive ] = useState(false);
  const { clear } = useAuth();

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
              <NavLink to='/about' >About</NavLink>
            </li>
            { user ?
              <li className='nav-item'>
                <Dropdown title='My Maps'>
                  <div className="dropdown-links">
                    <Link to='/map1'>Map 1</Link>
                    <Link to='/map2'>Map 2</Link>
                    <Link to='/map3'>Map 3</Link>
                    <Link to='/maps'>Other</Link>
                  </div>
                </Dropdown>
              </li>
              :
              <></>
            }
            <li className='nav-item'>
              <NavLink to='/faq' >FAQ</NavLink>
            </li>
          </div>
          { user ? 
            <div id='profile-dropdown'>
              <ProfileDropdown title={'https://shorturl.at/acJKX'}>
                <div className='profile-links'>
                  <Link to='/profile'>My Profile</Link>
                  <Link to='/maps'>My Maps</Link>
                  <Link to='/presentation' onClick={clear} >Log Out</Link>
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