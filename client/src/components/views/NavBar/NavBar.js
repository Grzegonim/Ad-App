import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { activeUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from './NavBar.module.scss';

const NavBar = () => {
  const user = useSelector(activeUser);
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search/${searchPhrase}`);
  }
  
  return (
    <div>
      <Navbar bg="white" className="justify-content-end">
          {user === null &&
            <Nav className="">

              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </Nav>
          }
          {user !== null && 
            <Nav className="justify-content-end">
              <Nav.Link as={NavLink} to="/logout">Log out</Nav.Link>
            </Nav>
          }
        
      </Navbar>

      <Navbar bg="primary">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" className="text-light">Home</Nav.Link>

          {user !== null && 
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/offer/add" className="text-light">Add offer</Nav.Link>
            </Nav>
          }
        </Nav>

        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={e => setSearchPhrase(e.target.value)}
          />
          <Button type="submit" variant="light">Search</Button>
        </Form>

      </Navbar>
    </div>
    
  );
}

export default NavBar;