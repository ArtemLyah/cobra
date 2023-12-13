import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Image, Stack } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export const Menu = () => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#1D1D2A' }}>
      <Container>
        <Nav.Link href="#home">
          <Image src="https://shorturl.at/bvxLO" class="img-fluid" width="45px" height="45px" rounded />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav nav-underline">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">FAQ</Nav.Link>
          </Nav>
          <Nav>
            { user ? 
              <Button variant="success"> Profile</Button>
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

export default Menu;