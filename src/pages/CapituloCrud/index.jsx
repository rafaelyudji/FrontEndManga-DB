import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrudComponent = () => {
    const [capitulos, setCapitulos] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nome_capitulo: '',
        numero_capitulo: '',
        id_manga: '',
    });

    const fetchCapitulos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/capitulo');
            setCapitulos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCapitulos();
    }, []);

    const handleInputChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddCapitulo = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/capitulo', formData);
            setCapitulos((prevCapitulos) => [...prevCapitulos, response.data]);

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditCapitulo = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/capitulo/${formData.id}`, formData);
            setCapitulos((prevCapitulos) =>
                prevCapitulos.map((capitulo) => {
                    if (capitulo.id === formData.id) {
                        return formData;
                    }
                    return capitulo;
                })
            );

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCapitulo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/capitulo/${id}`);
            setCapitulos((prevCapitulos) => prevCapitulos.filter((capitulo) => capitulo.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditForm = (capitulo) => {
        setFormData({
            id: capitulo.id,
            nome_capitulo: capitulo.nome_capitulo,
            numero_capitulo: capitulo.numero_capitulo,
            id_manga: capitulo.id_manga,
        });
    };

    const resetFormData = () => {
        setFormData({
            id: '',
            nome_capitulo: '',
            numero_capitulo: '',
            id_manga: '',
        });
    };

    return (
        <div>
            <h1>Lista de Capítulos</h1>
            <ul>
                {capitulos.map((capitulo) => (
                    <li key={capitulo.id}>
                        <strong>Nome do Capítulo:</strong> {capitulo.nome_capitulo}
                        <br />
                        <strong>Número do Capítulo:</strong> {capitulo.numero_capitulo}
                        <br />
                        <strong>ID do Manga:</strong> {capitulo.id_manga}
                        <br />
                        <button onClick={() => handleEditForm(capitulo)}>Editar</button>
                        <button onClick={() => handleDeleteCapitulo(capitulo.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h2>Adicionar/Editar Capítulo</h2>
            <form onSubmit={formData.id ? handleEditCapitulo : handleAddCapitulo}>
                <label>
                    Nome do Capítulo:
                    <input
                        type="text"
                        name="nome_capitulo"
                        value={formData.nome_capitulo}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Número do Capítulo:
                    <input
                        type="text"
                        name="numero_capitulo"
                        value={formData.numero_capitulo}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    ID do Manga:
                    <input
                        type="text"
                        name="id_manga"
                        value={formData.id_manga}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                {formData.id ? (
                    <button type="submit">Salvar Edição</button>
                ) : (
                    <button type="submit">Adicionar Capítulo</button>
                )}
            </form>
        </div>
    );
};

export default CrudComponent;
