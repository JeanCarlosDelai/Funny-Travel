import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/auth";
import Routess from "./routes/";
const App = () => {
  return (
    <>
      <p>Olá</p>
      <Navigation />
      <AuthProvider>
        <Routess />
      </AuthProvider>
    </>
  );
};

export default App;
