import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, surname, username, password };

    try {
      const response = await apiConnection.post("/api/signup", userData);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario registrado con éxito',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("User created successfully:", response.data);
      navigate("/login");

    } catch (error) {
      Swal.fire({
        position: "center",
        background: "#212529",
        color: "white",
        icon: "error",
        title: "Usuario ya registrado.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error creating user:", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordMatch = password === confirmPassword;

  return (
    <Container>
      <h1>REGISTRO</h1>
      <Form onSubmit={handleSubmit} className="formLog">
        <Form.Group controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSurname">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
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
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirma tu contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordMatch && <Form.Text className="text-danger">Las contraseñas no coinciden</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!passwordMatch}>
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Registro;
