import React, {useState} from "react";
import {Button, Input, Space, Table} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {BotaoAlerta, BotaoDanger} from "../../../shared/botoes/Botoes";

const FormaPagamentoLista = ({handlers, formasPagamento}) => {
    let searchInput;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [infoOrdenacao, setInfoOrdenacao] = useState({});

    const handleChange = (paginacao, filtro, ordenacao) => {
        setInfoOrdenacao(ordenacao);
    };

    const getFiltroProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                    >
                        Pesquisar
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)}>
                        Limpar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleEditar = (formaPagamento) => {
        handlers.editar(formaPagamento);
    }

    const handleRemover = (id) => {
        handlers.remover(id);
    }


    const colunas = [
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            sorter: (a, b) => a.descricao.length - b.descricao.length,
            sortOrder: infoOrdenacao.columnKey === 'descricao' && infoOrdenacao.order,
            ellipsis: true,
            ...getFiltroProps('descricao'),
            render: (descricao, formaPagamento, index) => (
                <span key={index}>{descricao}</span>
            )
        }, {
            title: 'Ações',
            key: 'acoes',
            dataIndex: 'id',
            width: '20%',
            align: 'center',
            render: (id, formaPagamento) => (
                <Space size="middle" key={id}>
                    <BotaoAlerta handler={() => handleEditar(formaPagamento)} label="Editar" />
                    <BotaoDanger handler={() => handleRemover(id)} label="Remover"/>
                </Space>
            ),
        }
    ];

    return (
        <>
            <h2>Lista de Formas de Pagamento</h2>

            <Table columns={colunas} dataSource={formasPagamento} onChange={handleChange} pagination={false}
                   bordered={true}/>
        </>
    );
}

export default FormaPagamentoLista;
