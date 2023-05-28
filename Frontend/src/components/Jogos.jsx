
import React, { useState, useEffect } from 'react';

import deleteJogo from '../persistencia/deleteJogo';

function Jogos() {
    const [jogos, setJogos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/jogos')
            .then(response => response.json())
            .then(data => setJogos(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <div className='container text-center'>
                <div class="row">
                    <div class="col">
                        <div className='App'>
                            <ul className='jogos'>
                                {jogos.map(jogo => (
                                    <li key={jogo._id}>
                                        <div className='jogo'>
                                            <img src={jogo.imagem} alt={jogo.name} className='imagem' />
                                            <div className='informacoes'>
                                                <h2>{jogo.name}</h2>
                                                <p><strong>Categoria:</strong> {jogo.categoria}</p>
                                                <button className="btn btn-outline-danger" onClick={() => deleteJogo(jogo._id)}>Deletar jogo</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div className='App'>
                            <ul className='jogos'>
                                {jogos.map(jogo => (
                                    <li id="description" key={jogo._id}>
                                        <p><strong>Descrição</strong></p>
                                        <p>{jogo.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Jogos;
