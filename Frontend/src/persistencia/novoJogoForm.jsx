import React, { useState } from 'react';
import axios from 'axios';

function NovoJogoForm() {
    const [name, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagem, setImagem] = useState('');
    const [description, setDescription] = useState('');

    const handleNomeChange = (event) => {
        setNome(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setCategoria(event.target.value);
    };

    const handleImagemChange = (event) => {
        setImagem(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/jogos', {
                name,
                categoria,
                imagem,
                description,
            });

            console.log(response.data);
            alert('Jogo adicionado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao adicionar jogo!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
           
            <div Class="input-group mb-3">
                <span Class="input-group-text" id="inputGroup-sizing-default">Nome do Jogo</span>
                <input type="text" Class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"value={name} onChange={handleNomeChange} />
            </div>
            <div Class="input-group mb-3">
                <span Class="input-group-text" id="inputGroup-sizing-default">Categoria</span>
                <input type="text" Class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"value={categoria} onChange={handleCategoriaChange} />
            </div>
            <div Class="input-group mb-3">
                <span Class="input-group-text" id="inputGroup-sizing-default">Imagem</span>
                <input type="text" Class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"value={imagem} onChange={handleImagemChange} />
            </div>
            <div Class="input-group mb-3">
                <span Class="input-group-text" id="inputGroup-sizing-default">Descrição</span>
                <input type="text" Class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"value={description} onChange={handleDescriptionChange} />
            </div>
            <button type="submit"Class="btn btn-outline-dark" >Adicionar Jogo</button>
        </form>
    );
}

export default NovoJogoForm;

