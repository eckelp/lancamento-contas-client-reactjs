import React, {useEffect, useState} from "react";
import Mensagens from "../../shared/mensagens/Mensagens";
import FormaPagamentoForm from "./form/FormaPagamentoForm";
import FormaPagamentoLista from "./lista/FormaPagamentoLista";
import FormaPagamentoService from "../../../../app/formasPagamento/FormaPagamentoService";

const FormasPagamento = () => {
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [formasPagamento, setFormasPagamento] = useState([]);

    const handlersForm = {
        salvar: async (formaPagamento) => {
            const response = await new FormaPagamentoService().salvar(formaPagamento)
            if (response && response.status && (response.status === 200 || response.status === 201)) {
                Mensagens.sucesso("Yes! Forma de pagamento salva com sucesso!")
            } else {
                Mensagens.erro("Ops! Não conseguimos salvar a forma de pagamento!")
            }
            buscarFormasPagamento();
        },
        limparFormulario: () => setFormaPagamento(null)
    }

    const handlersLista = {
        editar: (formaPagamento) => setFormaPagamento(formaPagamento),
        remover: async (id) => {
            const response = await new FormaPagamentoService().remover(id);

            if (response && response.status && response.status === 200) {
                Mensagens.sucesso("Yes! Forma de pagamento removida com sucesso!")
                handlersForm.limparFormulario();
            } else {
                Mensagens.erro("Ops! Não conseguimos remover a forma de pagamento!")
            }
            buscarFormasPagamento();
        }
    }

    const buscarFormasPagamento = async () => {
        const formaPagamentoService = new FormaPagamentoService();

        const response = await formaPagamentoService.buscarFormasPagamento();
        setFormasPagamento(response.data);
    }

    useEffect(() => { buscarFormasPagamento() }, []);


    return (
        <>
            <FormaPagamentoForm handlers={handlersForm} formaPagamento={formaPagamento} />
            <FormaPagamentoLista handlers={handlersLista} formasPagamento={formasPagamento}/>
        </>
    );


}

export default FormasPagamento;
