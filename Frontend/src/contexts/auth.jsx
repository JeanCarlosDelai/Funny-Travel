// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../services/api";
// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  
  
//   async function Login(name, password) {
//     const response = await api.post("/login", {
//       name: "mateus",
//       password: "123456",
//     });

//     console.log(response);
//     setUser(response.data.user);
//     api.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

//     // Salva no localStorage
//     localStorage.setItem("@App:user", JSON.stringify(response.data.user));
//     localStorage.setItem("@App:accessToken", response.data.accessToken);
//   }


//   function Logout() {
//     setUser(null);
//     localStorage.removeItem("@App:user");
//     localStorage.removeItem("@App:accessToken");
//   }
//   useEffect(() => {
//     const storagedUser = localStorage.getItem("@App:user");
//     const storagedToken = localStorage.getItem("@App:accessToken");
//     if (storagedToken && storagedUser) {
//       setUser(JSON.parse(storagedUser));
//       api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
//     }
//   }, []);
//   return (
//     <AuthContext.Provider
//       value={{ signed: Boolean(user), user, Login, Logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export function useAuth() {
//   const context = useContext(AuthContext);
//   return context;
// }

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function Login(name, password) {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        name,
        password,
      });

      setUser(response.data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

      // Salva no localStorage
      localStorage.setItem("@App:user", JSON.stringify(response.data.user));
      localStorage.setItem("@App:accessToken", response.data.accessToken);
    } catch (error) {
      console.error(error);
      throw new Error("Falha no login");
    }
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:accessToken");
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:accessToken");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
