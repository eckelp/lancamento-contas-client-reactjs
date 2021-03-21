import React, {useState} from "react";
import {Button, Input, Space, Table, Typography} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {BotaoAlerta, BotaoDanger} from "../../../shared/botoes/Botoes";
import moment from "moment";
import NumberFormat from 'react-number-format';

const LancamentoLista = ({lancamentos, handlers}) => {

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
            render: (descricao, lancamento, index) => (
                <span key={index}>{descricao}</span>
            )
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            sorter: (a, b) => a.data.length - b.data.length,
            sortOrder: infoOrdenacao.columnKey === 'data' && infoOrdenacao.order,
            ellipsis: true,
            ...getFiltroProps('data'),
            render: (data, lancamento, index) => (
                <span key={index}>{moment(data).format('DD/MM/YYYY')}</span>
            )
        },
        {
            title: 'Valor',
            dataIndex: 'valor',
            key: 'valor',
            align: 'right',
            sorter: (a, b) => a.valor.length - b.valor.length,
            sortOrder: infoOrdenacao.columnKey === 'valor' && infoOrdenacao.order,
            ellipsis: true,
            ...getFiltroProps('valor'),
            render: (valor, lancamento, index) => (
                <NumberFormat
                    key={index}
                    value={valor}
                    displayType='text'
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix='R$ '/>
            )
        },
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
            sorter: (a, b) => a.categoria.descricao.length - b.categoria.descricao.length,
            sortOrder: infoOrdenacao.columnKey === 'categoria' && infoOrdenacao.order,
            ellipsis: true,
            ...getFiltroProps('categoria'),
            render: (categoria, lancamento, index) => (
                <span key={index}>{categoria.descricao}</span>
            )
        },
        {
            title: 'Forma Pagamento',
            dataIndex: 'formaPagamento',
            key: 'formaPagamento',
            sorter: (a, b) => a.formaPagamento.descricao.length - b.formaPagamento.descricao.length,
            sortOrder: infoOrdenacao.columnKey === 'descricao' && infoOrdenacao.order,
            ellipsis: true,
            ...getFiltroProps('formaPagamento'),
            render: (formaPagamento, lancamento, index) => (
                <span key={index}>{formaPagamento.descricao}</span>
            )
        },
        {
            title: 'Ações',
            key: 'acoes',
            dataIndex: 'id',
            width: '20%',
            align: 'center',
            render: (id, lancamento) => (
                <Space size="middle" key={id}>
                    <BotaoAlerta handler={() => handleEditar(lancamento)} label="Editar"/>
                    <BotaoDanger handler={() => handleRemover(id)} label="Remover"/>
                </Space>
            ),
        }
    ];

    return (
        <>
            <h2>Lista de Lançamentos</h2>

            <Table columns={colunas}
                   dataSource={lancamentos}
                   onChange={handleChange}
                   pagination={false}
                   bordered={true}
                   summary={pageData => {
                       let totalLancamentos = 0;

                       pageData.forEach(({valor}) => {
                           totalLancamentos += valor;
                       });

                       return (
                           <>
                               <Table.Summary.Row style={{'backgroundColor': '#d7d7d7'}}>
                                   <Table.Summary.Cell colSpan={2}>
                                       <Typography.Text strong={true}>Total</Typography.Text>
                                   </Table.Summary.Cell>
                                   <Table.Summary.Cell align={'right'}>
                                       <Typography.Text  type="danger" strong={true}>
                                           <NumberFormat value={totalLancamentos}
                                                         displayType='text'
                                                         thousandSeparator='.'
                                                         decimalSeparator=','
                                                         decimalScale={2}
                                                         fixedDecimalScale={true}
                                                         prefix='R$ '/>
                                       </Typography.Text>
                                   </Table.Summary.Cell>
                               </Table.Summary.Row>
                           </>
                       );
                   }}
            />
        </>
    );
}


export default LancamentoLista;
