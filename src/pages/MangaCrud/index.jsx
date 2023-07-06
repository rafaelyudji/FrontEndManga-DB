import React, { useState, useEffect } from 'react';
import './index.css'
import axios from 'axios';

const CrudComponent = () => {
    const [mangas, setMangas] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        nome_manga: '',
        autor: '',
        resumo: '',
        genero: '',
        capa_img: '',
    });

    const fetchMangas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/manga');
            setMangas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMangas();
    }, []);

    const handleInputChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddManga = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/manga', formData);
            setMangas((prevMangas) => [...prevMangas, response.data]);

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditManga = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/manga/${formData.id}`, formData);
            setMangas((prevMangas) =>
                prevMangas.map((manga) => {
                    if (manga.id === formData.id) {
                        return formData;
                    }
                    return manga;
                })
            );

            resetFormData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteManga = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/manga/${id}`);
            setMangas((prevMangas) => prevMangas.filter((manga) => manga.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditForm = (manga) => {
        setFormData({
            id: manga.id,
            nome_manga: manga.nome_manga,
            autor: manga.autor,
            resumo: manga.resumo,
            genero: manga.genero,
            capa_img: manga.capa_img,
        });
    };

    const resetFormData = () => {
        setFormData({
            id: '',
            nome_manga: '',
            autor: '',
            resumo: '',
            genero: '',
            capa_img: '',
        });
    };

    return (
        <div>
            <h1>Lista de Mangas</h1>
            <ul>
                {mangas.map((manga) => (
                    <li key={manga.id}>
                        <strong>Nome do Manga:</strong> {manga.nome_manga}
                        <br />
                        <strong>Autor:</strong> {manga.autor}
                        <br />
                        <strong>Resumo:</strong> {manga.resumo}
                        <br />
                        <strong>Gênero:</strong> {manga.genero}
                        <br />
                        <strong>Capa:</strong> <img src={manga.capa_img} alt="Capa do Manga" />
                        <br />
                        <button onClick={() => handleEditForm(manga)}>Editar</button>
                        <button onClick={() => handleDeleteManga(manga.id)}>Excluir</button>
                    </li>
                ))}
            </ul>

            <h2>Adicionar/Editar Manga</h2 >
            <form onSubmit={formData.id ? handleEditManga : handleAddManga}>
                <label>
                    Nome do Manga:
                    <input
                        type="text"
                        name="nome_manga"
                        value={formData.nome_manga}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Autor:
                    <input
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Resumo:
                    <textarea
                        name="resumo"
                        value={formData.resumo}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </label>
                <br />
                <label>
                    Gênero:
                    <input
                        type="text"
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Capa (URL da imagem):
                    <input
                        type="text"
                        name="capa_img"
                        value={formData.capa_img}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                {formData.id ? (
                    <button type="submit">Salvar Edição</button>
                ) : (
                    <button type="submit">Adicionar Manga</button>
                )}
            </form>
        </div>
    );
};





export default CrudComponent;
