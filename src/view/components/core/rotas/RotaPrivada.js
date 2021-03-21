import {Redirect, Route} from "react-router-dom";
import AutenticacaoService from "../../../../app/autenticacao/AutenticacaoService";

const RotaPrivada = ({component: Component, ...params}) => {
    return (
        <Route
            {...params}
            render={props => {
                return (
                    new AutenticacaoService().estaAutenticado()
                        ? <Component {...props} />
                        : <Redirect to="/login"/>
                )
            }
            }
        />
    );

}

export default RotaPrivada;
