import './Botoes.less';
import React from "react";
import {Button} from "antd";

const BotaoPrimario = ({label, handler}) => {

    return (
        <BotaoGeral classe="btn-primary" label={label} handler={handler}/>
    )
}

const BotaoAlerta = ({label, handler}) => {

    handler = handler || (() => {});
    return (
        <BotaoGeral classe="btn-warn" label={label} handler={handler}/>
    )
}

const BotaoDanger = ({label, handler}) => {
    return (
        <BotaoGeral classe="btn-danger" label={label} handler={handler}/>
    )
}

const BotaoSucesso = ({label, handler}) => {
    return (
        <BotaoGeral classe="btn-success" label={label} handler={handler}/>
    )
}

const BotaoGeral = ({label, handler, classe}) => {

    handler = handler || (() => {});
    return (
        <Button className={classe} onClick={handler}>{label}</Button>
    )
}

export {BotaoPrimario, BotaoAlerta, BotaoDanger, BotaoSucesso};
