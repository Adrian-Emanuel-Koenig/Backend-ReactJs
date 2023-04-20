import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiConnection } from "../config/axiosConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    apiConnection
      .post("/api/login", userData)
      .then(({data}) => {
        console.log(data);
        navigate("/productos");
      })
      .catch((err) => {
        console.log(err);
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

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
        <Link to="/registro">¿No tienes cuenta? Regístrate aquí.</Link>
      </Form>
    </Container>
  );
};

export default Login;
