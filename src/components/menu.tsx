import React, { FormEvent } from 'react';
import { Navbar, Container, Nav, Button, Image, Stack, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Menu = () => {
  const { auth, clear } = useAuth();
  const navigate = useNavigate();

  const logout = (event: FormEvent) => {
    event.preventDefault();
    clear();
    navigate('/presentation');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#1D1D2A' }}>
      <Container>
        <Link to="/">
          <Image src="https://shorturl.at/AHKS8" className="img-fluid" width="45px" height="45px" rounded />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav nav-underline">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
          </Nav>
          <Nav>
            { auth?.user_id ? 
              <Dropdown>
                <Dropdown.Toggle id="user-profile-dropdown">
                  <Image src="https://shorturl.at/hjES1" className="img-fluid" width="45px" height="45px" rounded />
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-profile-menu" variant="dark">
                  <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Create map</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Maps</Dropdown.Item>
                  <Dropdown.Item eventKey="4" onClick={(e) => logout(e)}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : 
              <Stack direction="horizontal" gap={2}>
                <Button variant="success" onClick={() => navigate('/auth/register')}> Sign up </Button>
                <Button variant="success" onClick={() => navigate('/auth/login')}> Log in </Button>
              </Stack>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;