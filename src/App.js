import './App.less';
import React from "react";
import {Layout, Menu} from "antd";
import Categorias from "./components/dominio/categorias/Categorias";

function App() {
    return (
        <Layout className="layout">
            <Layout.Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">Categorias</Menu.Item>
                    <Menu.Item key="2">Formas de Pagamento</Menu.Item>
                    <Menu.Item key="3">Lançamentos</Menu.Item>
                </Menu>
            </Layout.Header>
            <Layout.Content style={{ padding: '0 50px', marginTop: '50px' }}>
                <div className="site-layout-content">
                    <Categorias />
                </div>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>Desenvolvido por Gabriel Eckel</Layout.Footer>
        </Layout>
    );
}

export default App;
