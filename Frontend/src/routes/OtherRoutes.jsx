// import React from "react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import NoMatch from "../components/NoMatch";
import AddJogo from "../pages/AddJogo/AddJogo";
import Home from "../pages/home";
import Jogos from "../pages/jogos/Jogos";

const OtherRoutes = () => {
  return (
    <Routes>
      <Route
        path="addJogo"
        element={
          <Layout>
            <AddJogo />
          </Layout>
        }
      />
      <Route
        path="/jogos"
        element={
          <Layout>
            <Jogos />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NoMatch />
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
};
export default OtherRoutes;
