import React, {useState, useEffect} from "react";
import {Form, Input, Space} from 'antd';
import {BotaoPrimario, BotaoSucesso} from "../../../shared/botoes/Botoes";

const CategoriaForm = ({handlers, categoria}) => {
    let inputDescricao;
    const [descricao, setDescricao] = useState( '');

    useEffect(() => {
        setDescricao(categoria ? categoria.descricao : '')
    }, [categoria, setDescricao]);

    const formLayout = "horizontal";
    const [form] = Form.useForm();

    const onChangeDescricao = (event) => {
        setDescricao(event.target.value);
    }

    const onClickSalvar = (event, id) => {
        event.preventDefault();
        handlers.salvar({id, descricao});
        setDescricao('');
    }

    const onClickLimparFormulario = () => {
        setDescricao('');
        handlers.limparFormulario();
    }

    return (
        <>
            <h2>Cadastro de Categoria</h2>
            <Form
                layout={formLayout}
                form={form}
            >
                    <Form.Item label="Descrição">
                    <Input placeholder="Informe a descrição da categoria" onChange={onChangeDescricao} value={descricao}/>
                </Form.Item>

                <Form.Item >
                    <Space>
                        <BotaoSucesso handler={(event) => {onClickSalvar(event, categoria ? categoria.id : null)}} label="Salvar" />
                        {categoria && ( <BotaoPrimario handler={onClickLimparFormulario} label="Novo" />)}

                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}

export default CategoriaForm;
