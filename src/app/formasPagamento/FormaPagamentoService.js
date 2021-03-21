import Http from "../shared/http/Http";

const API_FORMAS_PAGAMENTO = "/formas-pagamento";

class FormaPagamentoService {

    http;

    constructor() {
        this.http = new Http();
    }

    buscarFormasPagamento() {
        return this.http.get(API_FORMAS_PAGAMENTO);
    }

    salvar(formaPagamento) {
        if (formaPagamento && formaPagamento.id) {
            return this.http.put(API_FORMAS_PAGAMENTO + `/${formaPagamento.id}`, formaPagamento);
        } else if (formaPagamento){
            return this.http.post(API_FORMAS_PAGAMENTO, formaPagamento)
        }
    }

    remover(id) {
        return this.http.delete(API_FORMAS_PAGAMENTO + `/${id}`);
    }
}

export default FormaPagamentoService;
