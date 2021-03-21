import React, {useState} from "react";
import {Button, Col, Form, Input, Space} from "antd";
import {Link, Redirect} from "react-router-dom";
import CadastroService from "../../../../app/cadastro/CadastroService";
import Mensagens from "../../shared/mensagens/Mensagens";

const Cadastro = () => {

    const [redirecionarHome, setRedirecionarHome] = useState(false);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onChangeNome = event => {
        setNome(event.target.value);
    }

    const onChangeSobrenome = event => {
        setSobrenome(event.target.value);
    }

    const onChangeEmail = event => {
        setEmail(event.target.value)
    }

    const onChangeSenha = event => {
        setSenha(event.target.value)
    }

    const onCLickCadastrar = event => {
        const novoCadastro = {
            nome, sobrenome, email, senha
        };

        new CadastroService().cadastrar(novoCadastro)
            .then(response => {
                console.log(response)
                Mensagens.sucesso("Yes! Seja muito bem-vindo, " + response.nome);
                setRedirecionarHome(true);
            })
            .catch(error => {
                Mensagens.erro("Ops! Não foi possível realizar o cadastro!")
            });
    }


    return (
        redirecionarHome ? <Redirect to="/" /> :
        <div className="container-center">
            <Col span={4}>
                <Form
                    layout="vertical"
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        value={nome}
                        onChange={onChangeNome}
                        rules={
                            [
                                {required: true, message: 'Por favor, informe o nome!'},
                                {min: 3, message: 'Por favor, informe o nome!'},
                            ]
                        }
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Sobrenome"
                        name="sobrenome"
                        value={sobrenome}
                        onChange={onChangeSobrenome}
                        rules={
                            [
                                {required: true, message: 'Por favor, informe o sobrenome!'},
                                {min: 3, message: 'Por favor, informe o sobrenome!'},
                            ]
                        }
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="E-mail"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        rules={
                            [
                                {
                                    type: 'email',
                                    message: 'Por favor, informe um e-mail válido'
                                },
                                {required: true, message: 'Por favor, informe o e-mail!'},
                                // {pattern: "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
                                // , message: 'Por favor, informe um e-mail válido'}
                            ]
                        }
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="senha"
                        value={senha}
                        onChange={onChangeSenha}
                        rules={
                            [
                                {required: true, message: 'Por favor, informe a senha!'},
                                {min: 8, message: 'Por favor, informe no mínimo 8 caracteres'}
                            ]
                        }
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="button" onClick={onCLickCadastrar}>
                                Cadastrar
                            </Button>
                            <Link to="/login">Já sou cadastrado</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </div>
    );
}

export default Cadastro;
