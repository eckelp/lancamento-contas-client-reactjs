import {message} from 'antd';
import React from "react";

export default  {
    sucesso: (texto) => {
        message.success(texto)
    },
    erro: (texto) => {
        message.error(texto);
    },
    alerta(texto) {
        message.warn(texto);
    }
}
