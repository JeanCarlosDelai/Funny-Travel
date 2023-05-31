import axios from "axios";
const deleteJogo = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/jogos/${id}`);
    console.log(response.data);
    alert("Jogo excluído com sucesso!");
    window.location = "/jogos";
  } catch (error) {
    console.error(error);
    alert("Não foi póssível exluir o jogo!");
    window.location = "/jogos";
  }
};

export default deleteJogo;
