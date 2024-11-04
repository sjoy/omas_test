import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/animal-types" className="text-warning">
              Справочник типов животных
            </Nav.Link>
            <Nav.Link as={Link} to="/breeds" className="text-warning">
              Справочник пород
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/animals" className="text-info">
              Животные
            </Nav.Link>
            <Nav.Link as={Link} to="/weightings" className="text-info">
              Взвешивании
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
