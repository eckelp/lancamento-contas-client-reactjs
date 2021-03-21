const KEY_TOKEN = "KEY_TOKEN";

export default class StorageService {

    setToken(token){
        localStorage.setItem(KEY_TOKEN, token);
    };

    getToken(){
        const token = localStorage.getItem(KEY_TOKEN);
        return token;
    }

    limparToken(){
        localStorage.removeItem(KEY_TOKEN);
    }

    salvarTokenDaResposta(response) {
        if(response && response.status === 200){
            this.setToken(response.headers.authorization);
        }
    }


}
