import axios from "axios";


const API = 'http://localhost:8080/v1/blueprints/';


export const getBlueprintsByAuthor = async (author: string) => {
    try {
        const data = axios.get<Response>(API+author);
        return data; 
    } catch (error) {
        alert(error);
    }
};