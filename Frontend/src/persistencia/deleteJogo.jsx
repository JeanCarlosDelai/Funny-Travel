import axios from 'axios';

const deleteJogo = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/jogos/${_id}`);
      console.log(response.data);
      alert('Jogo excluído com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Não foi póssível exluir o jogo!');
    }
  };

export default deleteJogo;
