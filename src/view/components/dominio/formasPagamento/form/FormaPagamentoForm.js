import React, {useState, useEffect} from "react";
import {Col, Form, Input, Row, Space} from "antd";
import {BotaoPrimario, BotaoSucesso} from "../../../shared/botoes/Botoes";

const formLayout = "vertical";

const FormaPagamentoForm = ({formaPagamento, handlers}) => {
    const [form] = Form.useForm();
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        setDescricao(formaPagamento ? formaPagamento.descricao : '');
    }, [formaPagamento, setDescricao])

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
            <h2>Cadastro de Forma de Pagamento</h2>
            <Form
                layout={formLayout}
                form={form}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="Descrição">
                            <Input placeholder="Forma de Pagamento" onChange={onChangeDescricao} value={descricao}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item >
                    <Space>
                        <BotaoSucesso handler={(event) => {onClickSalvar(event, formaPagamento ? formaPagamento.id : null)}} label="Salvar" />
                        {formaPagamento && ( <BotaoPrimario handler={onClickLimparFormulario} label="Novo" />)}
                    </Space>
                </Form.Item>
            </Form>
        </>
    );

}

export default FormaPagamentoForm;
