import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";

const Profile = () => {
  const [usernameBack, setUsernameBack] = useState("");
  const [storedOrders, setStoredOrders] = useState([]);

  useEffect(() => {
    if (usernameBack) {
      apiConnection.get(`/api/cart/${usernameBack}`).then((res) => {
        setStoredOrders(res.data);
      });
    }
  }, [usernameBack]);

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      setUsernameBack(data.username);
    });
  }, []);
  console.log(storedOrders);
  return (
    <>

      <Container>
        <h3>Mis ordenes</h3>
        <Table striped bordered variant="dark">
          <thead>
            <tr>
              <th>N° de orden</th>
              <th>Productos</th>
              <th>Monto total</th>
              <th>Fecha</th>
              <th>Estado de Orden</th>
            </tr>
          </thead>
          <tbody>
            {storedOrders.map((data) => (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.cart.map((item) => JSON.stringify(item.nombre)).join(", ")}</td>
                <td>${data.totalPrice}</td>
                <td>{data.date}</td>
                <td>
                  {data.orderStatus === true
                    ? "Aprobado"
                    : data.orderStatus === false
                    ? "Rechazado"
                    : "Pendiente"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Profile;
