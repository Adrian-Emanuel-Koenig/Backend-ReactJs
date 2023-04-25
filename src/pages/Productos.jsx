import { apiConnection } from "../config/axiosConfig";
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [carro, setCarro] = useState([]);
  const [username, setUsername] = useState("");

  // Recuperar el nombre de usuario del servidor cuando el componente se monta
  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      if (data.username) {
        setUsername(data.username);
      }
    });
  }, []);

  // Recuperar la lista de productos del servidor cuando el componente se monta
  useEffect(() => {
    apiConnection.get("/api/productos").then(({ data }) => {
      setProductos(data.data);
    });
  }, []);

  // Agregar un producto al carrito
  const handleAgregarCarro = (producto) => {
    setCarro([...carro, producto]);
  };

  // Quitar un producto del carrito
  const handleQuitarCarro = (producto) => {
    const nuevoCarro = carro.filter((p) => p._id !== producto._id);
    setCarro(nuevoCarro);
  };

  // Enviar el carrito a la API
  const handleSubmit = () => {
    apiConnection.post("/api/cart", { username: username, cart: carro });
    setCarro([]);
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
      <div>
        <h3>Carrito de compras</h3>
        <Table striped bordered variant="dark">
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
          </tbody>
        </Table>
        <Button variant="primary" onClick={handleSubmit}>
          Enviar carrito
        </Button>
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

/* -------------------------------------------------------------------------- */
/*                                  ORIGINAL                                  */
/* -------------------------------------------------------------------------- */

// import { apiConnection } from "../config/axiosConfig";
// import React, { useState, useEffect } from "react";
// import { Container, Table } from "react-bootstrap";

// const Productos = () => {
//   const [productos, setProductos] = useState([]);
//   const [carro, setCarro] = useState([]);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     apiConnection.get("/api/username").then(({ data }) => {
//       if (data.username) {
//         setUsername(data.username);
//       }
//     });
//   }, [username]);

//   useEffect(() => {
//     apiConnection.get("/api/productos").then(({ data }) => {
//       setProductos(data.data);
//     });
//   }, []);

//   const newCart = {
//     username: username,
//     cart: [carro]
//   };

//   const handleSubmit = () => {
//     apiConnection.post("/api/cart", newCart);
//   };

//   return (
//     <Container>
//       <h2>Listado de productos</h2>
//       <div className="table">
//         <Table striped bordered variant="dark">
//           <thead>
//             <tr>
//               <th>Nombre</th>
//               <th>Precio</th>
//               <th>Stock</th>
//               <th>Categoría</th>
//               <th>Imagen</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productos.map((producto) => (
//               <Producto key={producto._id} producto={producto} />
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// };

// const Producto = ({ producto }) => {
//   return (
//     <tr>
//       <td>{producto.nombre}</td>
//       <td>${producto.precio}</td>
//       <td>{producto.stock}</td>
//       <th>{producto.categoria}</th>
//       <td>
//         <img
//           src={producto.img}
//           alt={producto.nombre}
//           style={{ width: "70px", height: "80px" }}
//         />
//       </td>
//     </tr>
//   );
// };

// export default Productos;
