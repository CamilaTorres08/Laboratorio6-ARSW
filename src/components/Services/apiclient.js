import axios from "axios";


const apiclient = (function () {
    const API = 'http://localhost:8080/v1/blueprints/';
    return {
        getBlueprintsByAuthor:  async function(author, callback){
        try {
            const r = await axios.get(API+author);
            if(r && r.data) {
                callback(r.data.description);
            } 
        } catch (error) {
            alert(error);
        }
    },

        getBlueprintsByAuthorAndName: async function(author, name, callback){
        try {
            const r = await axios.get(API+author+"/"+name);
            if(r && r.data) {
                callback(r.data.description);
            } 
        } catch (error) {
            alert(error.data);
        }
        }
    }
})();

export default apiclient;