import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>Ohh! Pagina não encontrada</h3>
        <p>Parece que não conseguimos encontrar a página que você está procurando</p>
        <Link to='/'>Voltar para a home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
