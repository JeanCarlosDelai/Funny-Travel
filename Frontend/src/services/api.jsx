import axios from "axios";
const api = axios.create({
  //Informe a porta do serviço de autenticação
  baseURL: "http://localhost:3000",
});
export default api;
