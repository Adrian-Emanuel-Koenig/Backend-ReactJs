import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { counterContext } from "../context/counterContext";
import Swal from "sweetalert2";

const Productos = () => {
  const { carro, setCarro, productos } = useContext(counterContext);

  const handleAgregarCarro = (producto) => {
    Swal.fire({
      position: "top-end",
      background: "#198754",
      color: "white",
      width: "17rem",
      toast: true,
      icon: "success",
      title: "Producto añadido al carro.",
      showConfirmButton: false,
      timer: 1500,
      heightAuto: false,
      imageHeight: "10rem",
    });
    setCarro([...carro, producto]);
  };

  return (
    <Container>
      <h2>Listado de productos</h2>
      <div className="table">
        <Table striped bordered variant="dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              {/* <th>Stock</th> */}
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Carrito</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <Producto
                key={producto._id}
                producto={producto}
                onAgregarCarro={handleAgregarCarro}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

const Producto = ({ producto, onAgregarCarro }) => {
  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>${producto.precio}</td>
      {/* <td>{producto.stock}</td> */}
      <th>{producto.categoria}</th>
      <td>
        <img
          src={producto.img}
          alt={producto.nombre}
          style={{ width: "70px", height: "80px" }}
        />
      </td>
      <td>
        <Button variant="success" onClick={() => onAgregarCarro(producto)}>
          
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
        </Button>
      </td>
    </tr>
  );
};

export default Productos;
