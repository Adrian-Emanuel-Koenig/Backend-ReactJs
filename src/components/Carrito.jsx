export const Carrito = ({ carrito }) => {
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {carrito.map((producto) => (
            <li key={producto._id}>{producto.nombre}</li>
          ))}
        </ul>
      </div>
    );
  };
  