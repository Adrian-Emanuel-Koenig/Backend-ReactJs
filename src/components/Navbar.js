import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { Carrito } from "./Carrito";

const Layout = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    apiConnection.get("/api/logout").then(() => {
      setUsername("");
      navigate("/login");
    });
  };

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      if (data.username) {
        setUsername(data.username);
      } 
    });
  }, [username]);

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
                <Nav.Link href="/perfil">Perfil</Nav.Link>
                <Nav.Link href="/soporte">Soporte</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Carrito/>
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
