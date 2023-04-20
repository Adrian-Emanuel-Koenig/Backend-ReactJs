import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import { useEffect, useState } from "react";
const Layout = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
 
  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      console.log(data)
      setUsername(data.username);
    });
  }, []);

  const handleLogout = () => {
    apiConnection.get("/api/logout").then(() => {
      setUsername("");
      navigate("/login")
    });
  };

  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/productos">Productos</Nav.Link>
          </Nav>
          <Nav>
            {username ? (
              <>
                <Nav.Link href="#">¡Hola, {username}!</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Outlet />
    </>
  );
};

export default Layout;
