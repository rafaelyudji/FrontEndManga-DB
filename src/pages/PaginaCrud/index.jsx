import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudComponent = () => {
    const [paginas, setPaginas] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        numero_pagina: '',
        img: '',
        id_capitulo: '',
    });

    const fetchPaginas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/pagina');
            setPaginas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPaginas();
    }, []);

    const handleInputChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddPagina = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/pagina', formData);
            setPaginas((prevPaginas) => [...prevPaginas, response.data]);

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditPagina = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/pagina/${formData.id}`, formData);
            setPaginas((prevPaginas) =>
                prevPaginas.map((pagina) => {
                    if (pagina.id === formData.id) {
                        return formData;
                    }
                    return pagina;
                })
            );

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePagina = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/pagina/${id}`);
            setPaginas((prevPaginas) => prevPaginas.filter((pagina) => pagina.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditForm = (pagina) => {
        setFormData({
            id: pagina.id,
            numero_pagina: pagina.numero_pagina,
            img: pagina.img,
            id_capitulo: pagina.id_capitulo,
        });
    };

    const resetFormData = () => {
        setFormData({
            id: '',
            numero_pagina: '',
            img: '',
            id_capitulo: '',
        });
    };

    return (
        <div>
            <h1>Lista de Páginas</h1>
            <ul>
                {paginas.map((pagina) => (
                    <li key={pagina.id}>
                        <strong>Número da Página:</strong> {pagina.numero_pagina}
                        <br />
                        <strong>Imagem: </strong> <img src={pagina.img} alt="Pagína" />
                        <br />
                        <strong>ID do Capítulo:</strong> {pagina.id_capitulo}
                        <br />
                        <button onClick={() => handleEditForm(pagina)}>Editar</button>
                        <button onClick={() => handleDeletePagina(pagina.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h2>Adicionar/Editar Página</h2>
            <form onSubmit={formData.id ? handleEditPagina : handleAddPagina}>
                <label>
                    Número da Página:
                    <input
                        type="text"
                        name="numero_pagina"
                        value={formData.numero_pagina}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Imagem:
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    ID do Capítulo:
                    <input
                        type="text"
                        name="id_capitulo"
                        value={formData.id_capitulo}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                {formData.id ? (
                    <button type="submit">Salvar Edição</button>
                ) : (
                    <button type="submit">Adicionar Página</button>
                )}
            </form>
        </div>
    );
};

export default CrudComponent;
