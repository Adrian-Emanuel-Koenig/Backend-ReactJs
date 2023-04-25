import React from "react";
import { Form, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "../components/Chat";

const socket = io("http://localhost:8080");

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);
  const [firstTime, setfirstTime] = useState(false);

  useEffect(() => {
    const receivedMessage = (message) => {
      //console.log(message)
      setMessages([message, ...messages]);
    };
    socket.on("message", receivedMessage);

    //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);

  //Cargamos los mensajes guardados en la BDD la primera vez
  if (!firstTime) {
    apiConnection.get(`/api/messages/koenig@gmail.com`).then((res) => {
      setStoredMessages(res.data);
    });
    setfirstTime(true);
  }

  const handlerSubmit = (e) => {
    //Evitamos recargar la página
    e.preventDefault();

    //Enviamos el mensaje sólo si se ha establecido un nickname
    if (nickname !== "") {
      //console.log(message)
      //Enviamos el mensaje al servidor
      socket.emit("message", message, nickname);

      //Nuestro mensaje
      const newMessage = {
        body: message,
        username: nickname,
      };
      //Añadimos el mensaje y el resto de mensajes enviados
      setMessages([newMessage, ...messages]);
      //Limpiamos el mensaje
      setMessage("");

      //Petición http por POST para guardar el artículo:
      apiConnection.post("/api/messages", {
        message: message,
        username: nickname,
      });
    } else {
      alert("Para enviar mensajes debes establecer un nickname!!!");
    }
  };

  const nicknameSubmit = (e) => {
    e.preventDefault();
    setNickname(nickname);
    //console.log(nickname)
    setDisabled(true);
  };
  return (
    <Container>
      <div className="container mt-3">
        <div className="card shadow border-0">
          <div className="card-body">
            <h5 className="text-center mb-3">CHAT</h5>

            {/* nickname */}

            <form onSubmit={nicknameSubmit}>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="nickname"
                  placeholder="Nickname..."
                  disabled={disabled}
                  onChange={(e) => setNickname(e.target.value)}
                  value={nickname}
                  required
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-nickname"
                  disabled={disabled}
                >
                  Establecer
                </button>
              </div>
            </form>

            {/* chat form */}

            <form onSubmit={handlerSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mensaje..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button className="btn btn-success mx-3" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* chat messages */}

        <div className="card mt-3 mb-3 shadow border-0" id="content-chat">
          <div className="card-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.username === message.username
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`card mb-3 shadow border-1 ${
                    message.username === message.username
                      ? "bg-success bg-opacity-25"
                      : "bg-light"
                  }`}
                >
                  <div className="card-body">
                    <small className="">
                      {message.username}: {message.body}
                    </small>
                  </div>
                </div>
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
                <div
                  className={`card mb-3 shadow border-1 ${
                    message.username === nickname
                      ? "bg-success bg-opacity-25"
                      : "bg-light"
                  }`}
                >
                  <div className="card-body">
                    <small className="text-muted">
                      {message.username}: {message.message}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

// export default Home;
