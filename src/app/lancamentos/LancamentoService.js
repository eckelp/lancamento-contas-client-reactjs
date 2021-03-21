import Http from "../shared/http/Http";

const API_LANCAMENTOS = "/lancamentos";

class LancamentoService {

    http;

    constructor() {
        this.http = new Http();
    }

    buscarLancamentos() {
        return this.http.get(API_LANCAMENTOS);
    }

    salvar(lancamento) {
        if (lancamento && lancamento.id) {
            return this.http.put(API_LANCAMENTOS + `/${lancamento.id}`, lancamento);
        } else if (lancamento){
            return this.http.post(API_LANCAMENTOS, lancamento)
        }
    }

    remover(id) {
        return this.http.delete(API_LANCAMENTOS + `/${id}`);
    }

}

export default LancamentoService;
