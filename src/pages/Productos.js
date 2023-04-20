import { apiConnection } from "../config/axiosConfig";
import React, { useState, useEffect, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Context } from "../context/ContextProvider";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  
  const {asd} = useContext(Context)

  useEffect(() => {
    asd()
    apiConnection.get("/api/productos").then(({ data }) => {
      setProductos(data.data);
    });
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <Producto key={producto._id} producto={producto} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

const Producto = ({ producto }) => {
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
    </tr>
  );
};

export default Productos;
