import React, { useState, useEffect } from "react";
import { counterContext } from "./counterContext";
import { apiConnection } from "../config/axiosConfig";

export const StateCompo = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [carro, setCarro] = useState([]);
  const [productos, setProductos] = useState([]);
  console.log(carro)

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      if (data.username) {
        setNickname(data.username);
      }
    });
  }, []);

  useEffect(() => {
    apiConnection.get("/api/productos").then(({ data }) => {
      setProductos(data.data);
    });
  }, []);

  
  return (
    <counterContext.Provider value={{ nickname, carro, setCarro, productos }}>
      {children}
    </counterContext.Provider>
  );
};
