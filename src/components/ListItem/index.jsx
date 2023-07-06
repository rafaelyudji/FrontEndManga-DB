import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListItem({ team, id, nome_manga, autor, resumo, genero, capa_img }) {

  return (
    <>
      <li key={id}><Link to={`/mangas/details/${id}`}> {team} {nome_manga}: {autor} - {resumo} - {genero} - {capa_img} </Link></li>
      <img src={capa_img}></img>
    </>
  )
}

export default ListItem;