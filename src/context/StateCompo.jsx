import React, { useState, useEffect } from "react";
import { counterContext } from "./counterContext";
import { apiConnection } from "../config/axiosConfig";

export const StateCompo = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [carro, setCarro] = useState([]);

  useEffect(() => {
    apiConnection.get("/api/username").then(({ data }) => {
      if (data.username) {
        setNickname(data.username);
      }
    });
  }, []);

  return (
    <counterContext.Provider value={{ nickname, carro, setCarro }}>
      {children}
    </counterContext.Provider>
  );
};
