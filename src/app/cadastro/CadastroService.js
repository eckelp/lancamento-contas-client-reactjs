import Http from "../shared/http/Http";
import StorageService from "../shared/storage/StorageService";

const API_CADASTRO = "/usuarios"

export default class CadastroService {

    http;
    storageService;

    constructor() {
        this.storageService = new StorageService();
        this.http = new Http();
    }

    cadastrar(novoCadastro){
        return this.http.post(API_CADASTRO, novoCadastro)
            .then(response => {
                this.storageService.salvarTokenDaResposta(response);
                return Promise.resolve(response.data);
            });
    }

}
