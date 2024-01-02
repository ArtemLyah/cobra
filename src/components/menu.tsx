import React from 'react';
import { Navbar, Container, Nav, Button, Image, Stack, Dropdown } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export const MenuComponent = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#1D1D2A' }}>
      <Container>
        <Nav.Link href="/">
          <Image src="https://shorturl.at/bvxLO" className="img-fluid" width="45px" height="45px" rounded />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav nav-underline">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
          </Nav>
          <Nav>
            { user ? 
              <Dropdown>
                <Dropdown.Toggle id="user-profile-dropdown">
                  <Image src="https://shorturl.at/hjES1" className="img-fluid" width="45px" height="45px" rounded />
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-profile-menu" variant="dark">
                  <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Create map</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Maps</Dropdown.Item>
                  <Dropdown.Item eventKey="4">Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              : 
              <Stack direction="horizontal" gap={2}>
                <Button variant="success"> Sign up </Button>
                <Button variant="success"> Log in </Button>
              </Stack>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuComponent;