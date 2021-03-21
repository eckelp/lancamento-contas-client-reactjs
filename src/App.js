import './App.less';
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./view/components/core/login/Login";
import Rotas from "./view/components/core/rotas/Rotas";
import Cadastro from "./view/components/core/Cadastro/Cadastro";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastrar" component={Cadastro} />

                <Rotas />
            </Switch>
        </ BrowserRouter>
    );
}

export default App;
