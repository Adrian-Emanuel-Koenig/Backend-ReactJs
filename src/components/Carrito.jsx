import React, { useContext, useState } from "react";
import { counterContext } from "../context/counterContext";
import { Button, Collapse } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import Swal from "sweetalert2";

export const Carrito = () => {
  const { nickname, carro, setCarro } = useContext(counterContext);
  const [abrirCarrito, setAbrirCarrito] = useState(false);

  const handleQuitarCarro = (producto) => {
    const nuevoCarro = carro.filter((p) => p._id !== producto._id);
    setCarro(nuevoCarro);
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "¿Enviar carrito?",
      text: "Una vez enviado, no podrás volver atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
    })
      .then((result) => {
        if (result.isConfirmed) {
          apiConnection.post("/api/cart", { username: nickname, cart: carro });
          setCarro([]);
          Swal.fire(
            "¡Enviado!",
            "Tu carrito ha sido enviado exitosamente",
            "success"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Hubo un problema al enviar tu carrito", "error");
      });
  };

  return (
    <div className="cartaCarro">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-end">
                <Button
                  variant="info"
                  onClick={() => setAbrirCarrito(!abrirCarrito)}
                  aria-controls="tabla-carrito"
                  aria-expanded={abrirCarrito}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>{" "}
                  ({carro.length})
                </Button>
              </div>
              <Collapse in={abrirCarrito}>
                <div id="tabla-carrito" className="mt-1">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {carro.map((producto) => (
                        <tr key={producto._id}>
                          <td>{producto.nombre}</td>
                          <td>${producto.precio}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleQuitarCarro(producto)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-cart-dash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {carro.length === 0 && (
                        <tr>
                          <td colSpan="3">No hay productos en el carrito</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="row justify-content-end">
                    <Button variant="primary" onClick={handleSubmit}>
                      Enviar carrito
                    </Button>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
