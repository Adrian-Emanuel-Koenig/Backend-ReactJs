import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import { apiConnection } from "../config/axiosConfig";

const Profile = () => {
  const [usernameBack, setUsernameBack] = useState("");
  const [storedOrders, setStoredOrders] = useState([]);

  useEffect(() => {
    if(usernameBack){
      apiConnection.get(`/api/cart/${usernameBack}`).then((res) => {
          console.log(res.data)
        setStoredOrders(res.data);
      });
    }
  }, [usernameBack]);

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      setUsernameBack(data.username);
    });
  }, []);

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Row>
        <Col md={3}>
          <Nav className="flex-column">
            <Nav.Link href="#">Mis datos</Nav.Link>
            <Nav.Link href="#">Mis ordenes</Nav.Link>
          </Nav>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* {storedOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td>${(order.quantity * order.price).toFixed(2)}</td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
