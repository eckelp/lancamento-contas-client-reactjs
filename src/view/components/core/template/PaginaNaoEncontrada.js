import React from "react";
import {Link} from "react-router-dom";

const PaginaNaoEncontrada = () => {
    return (
        <>
            Ops! Página não encontrada
            <br/>
            <Link to="/login">Voltar</Link>
        </>
    );
}

export default PaginaNaoEncontrada;
