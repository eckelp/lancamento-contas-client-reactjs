import Http from "../../../app/http/Http";

const API_CATEGORIAS = "/categorias";

class CategoriaService {

    http;

    constructor() {
        this.http = new Http();
    }

    buscarCategorias() {
        return this.http.get(API_CATEGORIAS);
    }

    salvar(categoria) {
        if (categoria && categoria.id) {
            return this.http.put(API_CATEGORIAS + `/${categoria.id}`, categoria);
        } else if (categoria){
            return this.http.post(API_CATEGORIAS, categoria)
        }
    }

    remover(id) {
        return this.http.delete(API_CATEGORIAS + `/${id}`);
    }
}

export default CategoriaService;
