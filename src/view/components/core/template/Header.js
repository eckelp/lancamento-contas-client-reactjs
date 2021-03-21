import {Dropdown, Layout, Menu} from "antd";
import {Link, Redirect} from "react-router-dom";
import React, {useState} from "react";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import AutenticacaoService from "../../../../app/autenticacao/AutenticacaoService";
import Mensagens from "../../shared/mensagens/Mensagens";


const Header = () => {

    const [redirecionarLogin, setRedirecionarLogin] = useState(false);

    const onClickLogout = (event) => {
        event.preventDefault();

        new AutenticacaoService().deslogar();
        setRedirecionarLogin(true);
        Mensagens.alerta("Que Pena!, Nos vemos em breve, certo?");
    }

    const menuUsuario = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={onClickLogout}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );
    return (
        redirecionarLogin ? <Redirect to="/login" /> :
        <Layout.Header>
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/lancamentos">Lançamentos</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/categorias">Categorias</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/formasPagamento">Formas de Pagamento</Link>
                </Menu.Item>
                <div style={{'float': 'right'}}>
                    <Dropdown overlay={menuUsuario} >
                        <span onClick={e => e.preventDefault()} style={{cursor: 'pointer'}}>
                            <UserOutlined style={{'fontSize': '18px'}}/>
                            <DownOutlined />
                        </span>
                    </Dropdown>
                </div>
            </Menu>

        </Layout.Header>
    );
}

export default Header;
