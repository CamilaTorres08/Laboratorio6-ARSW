import axios from "axios";
import {Response} from "./Response";


const API = 'http://localhost:8080/v1/blueprints/';


export const getBlueprintsByAuthor = async (author: string, callback :(response:any) => void ) => {
    try {
        const r = await axios.get<Response>(API+author);
        if(r) {
            console.log(r);
            callback(r.data.description);
        } 
    } catch (error) {
        alert(error);
    }
};

export const getBlueprintsByAuthorAndName = async (author: string, name: string, callback :(response:any) => void ) => {
    try {
        const r = await axios.get<Response>(API+author+"/"+name);
        if(r) {
            console.log(r);
            callback(r.data.description);
        } 
    } catch (error) {
        alert(error);
    }
};