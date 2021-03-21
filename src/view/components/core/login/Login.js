import {Button, Col, Form, Input, Row, Space} from "antd";
import React, {useState} from "react";
import AutenticacaoService from "../../../../app/autenticacao/AutenticacaoService";
import Mensagens from "../../shared/mensagens/Mensagens";
import {Link, Redirect} from "react-router-dom";

const Login = () => {

    const [sucessoLogin, setSucessoLogin] = useState(new AutenticacaoService().estaAutenticado());
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangeSenha = (event) => {
        setSenha(event.target.value);
    }

    const onCLickLogin = () => {
        const autenticacao = {
            email, senha
        }

        new AutenticacaoService().autenticar(autenticacao)
            .then(response => {
                Mensagens.sucesso('Yes! Que bom te ver por aqui, ' + response.nome);
            })
            .then(() => {
                setSucessoLogin(true);
            })
            .catch(err => {
                Mensagens.erro("Ops! Não foi possível validar suas credenciais!")
                setSucessoLogin(false);
            })
    };

    return (
        !!sucessoLogin ? (<Redirect to="/"/>) : (
            <div className="container-center">
                <Col span={4}>
                    <Form
                        layout="vertical"
                        initialValues={{remember: true}}
                    >
                        <Form.Item
                            label="E-mail"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            rules={[{required: true, message: 'Por favor, informe o e-mail!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Senha"
                            name="senha"
                            value={senha}
                            onChange={onChangeSenha}
                            rules={[{required: true, message: 'Por favor, informe a senha!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="button" onClick={onCLickLogin}>
                                    Login
                                </Button>
                                <Link to="/cadastrar">Quero me cadastrar</Link>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
            </div>
        )
    );
}

export default Login;


