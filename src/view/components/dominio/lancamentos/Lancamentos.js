import React, {useEffect, useState} from "react";
import LancamentoForm from "./form/LancamentoForm";
import LancamentoLista from "./lista/LancamentoLista";
import Mensagens from "../../shared/mensagens/Mensagens";
import LancamentoService from "../../../../app/lancamentos/LancamentoService";

const Lancamentos = () => {

    const [lancamento, setLancamento] = useState(null);
    const [lancamentos, setLancamentos] = useState([]);

    const handlersForm = {
        salvar: async (lancamento) => {
            const response = await new LancamentoService().salvar(lancamento)
            if (response && response.status && (response.status === 200 || response.status === 201)) {
                Mensagens.sucesso("Yes! Lançamento salvo com sucesso!")
            } else {
                Mensagens.erro("Ops! Não conseguimos salvar o lançamento!")
            }
            buscarLancamentos();
        },
        limparFormulario: () => setLancamento(null)
    }

    const handlersLista = {
        editar: (lancamento) => setLancamento(lancamento),
        remover: async (id) => {
            const response = await new LancamentoService().remover(id);

            if (response && response.status && response.status === 200) {
                Mensagens.sucesso("Yes! Lançamento removido com sucesso!")
                handlersForm.limparFormulario();
            } else {
                Mensagens.erro("Ops! Não conseguimos remover o lançamento!")
            }
            buscarLancamentos();
        }
    }

    const buscarLancamentos = async () => {
        const lancamentoService = new LancamentoService();

        const response = await lancamentoService.buscarLancamentos();
        setLancamentos(response.data);
    }

    useEffect(() => { buscarLancamentos() }, []);

    return (
        <>
            <LancamentoForm lancamento={lancamento} handlers={handlersForm}/>
            <LancamentoLista lancamentos={lancamentos} handlers={handlersLista}/>
        </>
    )

}

export default Lancamentos;
