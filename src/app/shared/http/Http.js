import axios from "axios";
import StorageService from "../storage/StorageService";

const API_URL = "http://localhost:8080"

export default class Http {

    storageService;

    constructor() {
        this.storageService = new StorageService();
    }

    getHeaders(){
        const token = this.storageService.getToken();

        return {
            'Authorization': `Bearer ${token}`
        }
    }

    get(url) {
        const headers = this.getHeaders();

        return axios.get(`${API_URL}${url}`, {headers});
    }

    post(url, body){
        const headers = url === '/auth' ? null : this.getHeaders();

        return axios.post(`${API_URL}${url}`, body,{headers});
    }

    put(url, body){
        const headers = this.getHeaders();

        return axios.put(`${API_URL}${url}`, body, {headers});
    }

    delete(url) {
        const headers = this.getHeaders();

        return axios.delete(`${API_URL}${url}`, {headers});
    }

}
