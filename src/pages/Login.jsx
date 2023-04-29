import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiConnection } from "../config/axiosConfig";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    apiConnection
      .post("/api/login", userData)
      .then(({ data }) => {
        Swal.fire({
          position: "center",
          background: "#212529",
          color: "white",
          title: "Bienvenido " + username + "!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/productos");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          background: "#212529",
          color: "white",
          icon: "error",
          title: "Usuario o contraseña incorrectos.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <Container>
      <h1>Iniciar sesión</h1>
      <Form onSubmit={handleSubmit} className="formLog">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
        </div>
        <Link to="/registro" className="linkRegister">
          ¿No tienes cuenta? Regístrate aquí.
        </Link>
      </Form>
    </Container>
  );
};

export default Login;
