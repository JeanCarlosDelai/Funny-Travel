import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/index";

const SignRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Amanhã testar mais um pouco esta parte */}
    </Routes>
  );
};
export default SignRoutes;
