import Http from "../shared/http/Http";
import StorageService from "../shared/storage/StorageService";

const API_AUTENTICACAO = "/auth";

export default class AutenticacaoService{

    storageService;
    http;

    constructor() {
        this.storageService = new StorageService();
        this.http = new Http();

    }

    estaAutenticado () {
        const token = this.storageService.getToken();
        return !!token;
    }

    autenticar (autenticacao) {
        return this.http
            .post(API_AUTENTICACAO, autenticacao)
            .then((response) => {
                this.storageService.salvarTokenDaResposta(response)

                return Promise.resolve(response.data);
            })
            .catch(error => {
                this.storageService.limparToken();
                return Promise.reject(error);
            });
    }

    deslogar() {
        this.storageService.limparToken();
    }
}
