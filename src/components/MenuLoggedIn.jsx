import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Image, Dropdown } from 'react-bootstrap';
// const [currentMenu, setCurrMenu] = useState(0);


export const MenuLoggedIn = () => {
  return (
    <Navbar  bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary" style={{ backgroundColor: '#1D1D2A' }}>
      <Container>
        <Nav.Link href="#home">
          <Image src="https://shorturl.at/bvxLO" class="img-fluid" width="45px" height="45px" rounded />
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav nav-underline">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="My maps" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#map1">Not Found</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">FAQ</Nav.Link>
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle id="user-profile-dropdown">
                <Image src="https://shorturl.at/hjES1" class="img-fluid" width="45px" height="45px" rounded />
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-profile-menu" variant="dark" bg="dark">
                <Dropdown.Item eventKey="1">My profile</Dropdown.Item>
                <Dropdown.Item eventKey="2">Create map</Dropdown.Item>
                <Dropdown.Item eventKey="3">Maps</Dropdown.Item>
                <Dropdown.Item eventKey="4">Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuLoggedIn;