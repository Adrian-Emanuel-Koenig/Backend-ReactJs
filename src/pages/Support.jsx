import React, { useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { counterContext } from "../context/counterContext";

// const socket = io("http://localhost:8080");
const socket = io("https://backend-server-production-c1b9.up.railway.app");

const Support = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);
  const { nickname } = useContext(counterContext);

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages((messages) => [message, ...messages]);
    };
    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);

  useEffect(() => {
    apiConnection.get("/api/messages/" + nickname).then((res) => {
      setStoredMessages(res.data);
    });
  }, [nickname]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message, nickname);

    setMessage("");

    apiConnection.post("/api/messages", {
      message: message,
      username: nickname,
    });
  };

  return (
    <Container>
      <div className="container mt-3">
        <Card className="shadow border-0">
          <Card.Body>
            <h5 className="text-center mb-3">Atención al cliente.</h5>
            {/* chat form */}
            <Form onSubmit={handlerSubmit}>
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Mensaje..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <Button className="btn-success mx-3" type="submit">
                  Enviar
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        {/* chat messages */}
        <Card className="mt-3 mb-3 shadow border-0" id="content-chat">
          <Card.Body>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.username === nickname
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <Card
                  className={`mb-3 shadow border-1 ${
                    message.username === nickname
                      ? "bg-success bg-opacity-25"
                      : "bg-light"
                  }`}
                >
                  <Card.Body>
                    <small className="">
                      {message.username}: {message.body}
                    </small>
                  </Card.Body>
                </Card>
              </div>
            ))}

            {/* chat stored messages */}
            <small className="text-center text-muted">
              ... Mensajes guardados ...
            </small>
            {storedMessages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.username === nickname
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <Card
                  className={`mb-3 shadow border-1 ${
                    message.username === nickname
                      ? "bg-success bg-opacity-25"
                      : "bg-light"
                  }`}
                >
                  <Card.Body>
                    <small className="text-muted">
                      {message.username}: {message.message}
                    </small>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Support;
