
import NovoJogoForm from '../persistencia/novoJogoForm';

const AddJogo = () => {

        const handleJogoAdicionado = novoJogo => {
        setJogos([...jogos, novoJogo]);
    };

    return (
        <>
            <ul>
                <NovoJogoForm onJogoAdicionado={handleJogoAdicionado} />
            </ul>
        </>
    );
};
export default AddJogo;

