import {Redirect, Route, Switch} from "react-router-dom";
import RotaPrivada from "./RotaPrivada";
import Lancamentos from "../../dominio/lancamentos/Lancamentos";
import Categorias from "../../dominio/categorias/Categorias";
import FormasPagamento from "../../dominio/formasPagamento/FormasPagamento";
import React from "react";
import DefaultTemplate from "../template/DetaultTemplate";
import PaginaNaoEncontrada from "../template/PaginaNaoEncontrada";

const Rotas = () => {
    return (
        <>
            <DefaultTemplate>
                <Route path="/" exact={true} render={() => <Redirect to="/lancamentos" />}/>
                <RotaPrivada path="/lancamentos" component={Lancamentos}/>
                <RotaPrivada path="/categorias"  component={Categorias}/>
                <RotaPrivada path="/formasPagamento" component={FormasPagamento}/>
            </DefaultTemplate>
        </>
    )
}

export default Rotas;
