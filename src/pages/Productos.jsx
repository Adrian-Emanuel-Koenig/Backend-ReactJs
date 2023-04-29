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
              <th>Stock</th>
              <th>Categoría</th>
              <th>Imagen</th>
              <th></th>
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
      <td>{producto.stock}</td>
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
          Agregar al carrito
        </Button>
      </td>
    </tr>
  );
};

export default Productos;
