import axios from "axios";

const API_URL = "http://localhost:8080"

export default class Http {

    getHeaders(){
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJpZFwiOjEsXCJ1c2VybmFtZVwiOlwiZ2FicmllbFwiLFwicGVyZmlzXCI6W119IiwiaXNzIjoibGFuY2FtZW50by1jb250YXMtYXBpIiwiaWF0IjoxNjE1OTMwMzgyLCJleHAiOjE2NDE4NDY3ODJ9.i-hRGzxl1X7ESB2wEIOLTbQ2uLZKgOVw8iyjU-bkRd0';
        return {
            'Authorization': `Bearer ${token}`
        }
    }

    get(url) {
        const headers = this.getHeaders();

        return axios.get(`${API_URL}${url}`, {headers});
    }

    post(url, body){
        const headers = this.getHeaders();

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
