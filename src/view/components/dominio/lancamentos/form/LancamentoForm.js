import React, {useEffect, useState} from "react";
import {Col, ConfigProvider, DatePicker, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {BotaoPrimario, BotaoSucesso} from "../../../shared/botoes/Botoes";
import FormaPagamentoService from "../../../../../app/formasPagamento/FormaPagamentoService";
import CategoriaService from "../../../../../app/categorias/CategoriaService";
import moment from 'moment';
import locale from 'antd/lib/locale/pt_BR';

const LancamentoForm = ({lancamento, handlers}) => {
    const [form] = Form.useForm();

    const [categorias, setCategorias] = useState([]);
    const [formasPagamento, setFormasPagamento] = useState([]);

    const [descricao, setDescricao] = useState('');
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [valor, setValor] = useState(0.0);
    const [data, setData] = useState(moment());

    useEffect(() => {

        buscarCategorias();
        buscarFormasPagamento();

        if (lancamento) {
            setarCampos(lancamento);
        } else {
            limparCampos();
        }


    }, [lancamento, setDescricao, setFormaPagamento, setCategoria, setValor, setData])

    const buscarCategorias = async () => {
        const categoriaService = new CategoriaService();

        const response = await categoriaService.buscarCategorias();
        setCategorias(response.data);
    }

    const buscarFormasPagamento = async () => {
        const formaPagamentoService = new FormaPagamentoService();

        const response = await formaPagamentoService.buscarFormasPagamento();
        setFormasPagamento(response.data);
    }

    const onChangeDescricao = (event) => {
        setDescricao(event.target.value);
    }

    const onChangeFormaPagamento = (formaPagamento) => {
        setFormaPagamento(formaPagamento);
    }

    const onChangeCategoria = (categoria) => {
        setCategoria(categoria)
    }

    const onChangeValor = (valor) => {
        setValor(valor);
    }

    const onChangeData = (dataMoment, dataString) => {
        setData(moment(dataString, 'DD/MM/YYYY'))
    }

    const onClickSalvar = (event, id) => {
        event.preventDefault();

        const lancamentoParaSalvar = {
            id,
            descricao,
            categoriaId: categoria,
            formaPagamentoId: formaPagamento,
            valor,
            data: data.format('YYYY-MM-DD')
        }

        handlers.salvar(lancamentoParaSalvar);
        limparCampos();
    }

    const onClickLimparFormulario = () => {
        limparCampos();
    }

    const setarCampos = (lancamento) => {
        setDescricao(lancamento.descricao);
        setFormaPagamento(lancamento.formaPagamento.id);
        setCategoria(lancamento.categoria.id);
        setValor(lancamento.valor);
        setData(moment(lancamento.data));
    }

    const limparCampos = () => {
        handlers.limparFormulario();
        setDescricao('');
        setFormaPagamento(null);
        setCategoria(null);
        setValor(0.0);
        setData(moment());
    }

    return (
        <>
            <h2>Cadastro de Lançamento</h2>
            <Form
                layout="vertical"
                form={form}
            >
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item label="Descrição">
                            <Input placeholder="Descrição" onChange={onChangeDescricao} value={descricao}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Data">
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    allowClear={false}
                                    defaultValue={moment(data, 'DD/MM/YYYY')}
                                    value={moment(data, 'DD/MM/YYYY')}
                                    format={'DD/MM/YYYY'}
                                    onChange={onChangeData}
                                />
                            </ConfigProvider>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Valor">
                            <InputNumber
                                value={valor}
                                laceholder="Valor"
                                defaultValue="0,00"
                                decimalSeparator=","
                                step="0.01"
                                min={0}
                                onChange={onChangeValor}
                            />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label="Categoria">
                            <Select
                                value={categoria}
                                showSearch
                                placeholder="Categoria"
                                optionFilterProp="children"
                                onChange={onChangeCategoria}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {categorias.map(categoria => (
                                    <Select.Option value={categoria.id} key={categoria.id}>{categoria.descricao}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Forma de Pagamento">
                            <Select
                                showSearch
                                value={formaPagamento}
                                placeholder="Forma de Pagamento"
                                optionFilterProp="children"
                                onChange={onChangeFormaPagamento}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {formasPagamento.map(formaPagamento => (
                                    <Select.Option value={formaPagamento.id}
                                                   key={formaPagamento.id}>{formaPagamento.descricao}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Space>
                        <BotaoSucesso handler={(event) => {
                            onClickSalvar(event, lancamento ? lancamento.id : null)
                        }} label="Salvar"/>
                        {lancamento && (<BotaoPrimario handler={onClickLimparFormulario} label="Novo"/>)}

                    </Space>
                </Form.Item>
            </Form>
        </>
    );

}

export default LancamentoForm;
