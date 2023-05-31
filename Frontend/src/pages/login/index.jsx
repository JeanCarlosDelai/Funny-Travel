// import axios from "axios";
// import React, { useState } from "react";
// import { useAuth } from "../../contexts/auth";

// function Login() {
//   const context = useAuth();
//   console.log(context);
//   function handleLogin() {
//     context.Login();
//   }

//   const [name, setNome] = useState("");
//   const [password, setPassword] = useState("");

//   const handleName = (event) => {
//     setNome(event.target.value);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         name,
//         password,
//       });

//       console.log(response.data);
//       alert("Usuário Logado com sucesso!");
//     } catch (error) {
//       console.error(error);
//       alert("Não cadastrado!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="input-group mb-3">
//         <span className="input-group-text" id="inputGroup-sizing-default">
//           Nome
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           aria-label="Sizing example input"
//           aria-describedby="inputGroup-sizing-default"
//           value={name}
//           onChange={handleName}
//         />
//       </div>
//       <div className="input-group mb-3">
//         <span className="input-group-text" id="inputGroup-sizing-default">
//           Senha
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           aria-label="Sizing example input"
//           aria-describedby="inputGroup-sizing-default"
//           value={password}
//           onChange={handlePassword}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//     </form>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useAuth } from "../../contexts/auth";

function Login() {
  const { Login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Login(name, password);
      alert("Usuário Logado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Não cadastrado!");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Nome
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Senha
        </span>
        <input
          type="password"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
