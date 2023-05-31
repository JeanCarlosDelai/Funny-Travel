import React from "react";
import { useAuth } from "../contexts/auth";

import OtherRoutes from "./OtherRoutes";
import SignRoutes from "./SignRoutes";

const Routess = () => {
  const { signed } = useAuth();
  console.log(signed);

  return signed ? <OtherRoutes /> : <SignRoutes />;
};
export default Routess;
