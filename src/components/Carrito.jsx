import React, { useContext, useState } from "react";
import { counterContext } from "../context/counterContext";
import { Button, Collapse } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";
import Swal from "sweetalert2";

export const Carrito = () => {
  const { nickname,carro, setCarro } = useContext(counterContext);
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
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        apiConnection.post("/api/cart", { username: nickname, cart: carro });
        setCarro([]);
        Swal.fire(
          "¡Enviado!",
          "Tu carrito ha sido enviado exitosamente",
          "success"
        );
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div className="row justify-content-end">
                <Button
                  variant="success"
                  onClick={() => setAbrirCarrito(!abrirCarrito)}
                  aria-controls="tabla-carrito"
                  aria-expanded={abrirCarrito}
                >
                  Ver carrito ({carro.length})
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
                              Quitar del carrito
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
