import React from "react";
import { Container } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const Home = () => {
  const [nickname, setNickname] = useState("");
  const [usernameBack, setUsernameBack] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      setNickname(data);
      setUsernameBack(data);
    });
  }, []);

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
    apiConnection.get("/api/messages/" + usernameBack).then((res) => {
      setStoredMessages(res.data);
    });
  }, [usernameBack]);

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
        <div className="card shadow border-0">
          <div className="card-body">
            <h5 className="text-center mb-3">CHAT</h5>

            <h5>Hola! {usernameBack}</h5>

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

export default Home;
