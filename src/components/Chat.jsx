import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8080');

    socket.on('mensaje', (data) => {
      setMensajes([...mensajes, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [mensajes]);

  const enviarMensaje = async (e) => {
    e.preventDefault();

    const nuevoMensaje = {
      usuario: 'Cliente',
      mensaje: mensaje,
    };

    setMensajes([...mensajes, nuevoMensaje]);
    setMensaje('');

    try {
      const respuesta = await axios.post('http://localhost:8080/mensaje', nuevoMensaje);
      console.log(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <h1>Chat de atención al cliente</h1>
          <div className="chat-container">
            {mensajes.map((mensaje, index) => (
              <div key={index} className="mensaje">
                <span className="usuario">{mensaje.usuario}: </span>
                <span className="contenido">{mensaje.mensaje}</span>
              </div>
            ))}
          </div>
          <Form onSubmit={enviarMensaje}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Escribe tu mensaje aquí"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Enviar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
