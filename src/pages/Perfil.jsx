import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
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
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {storedOrders.map((data) => (
              <tr>
                <td>{data._id}</td>
                <td>{data.cart.map((item) => JSON.stringify(item.nombre)).join(", ")}</td>
                <td>{data.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Profile;
