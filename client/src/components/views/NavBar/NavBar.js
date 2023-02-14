import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { activeUser } from "../../../redux/userReducer";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector(activeUser);

  return (
    <Navbar bg="primary">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        {user === null && 
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        }


        {user !== null && 
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/offer/add">Add offer</Nav.Link>
            <Nav.Link as={NavLink} to="/logout">Log out</Nav.Link>
          </Nav>
        }
      </Nav>
    </Navbar>
  );
}

export default NavBar;