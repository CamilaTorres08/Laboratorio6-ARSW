import axios from "axios";


const apiclient = (function () {
    const API = 'http://localhost:8080/v1/blueprints';
    return {
        getBlueprintsByAuthor:  async function(author, callback){
        try {
            const r = await axios.get(API+"/"+author);
            if(r && r.data) {
                callback(r.data.description);
            } 
        } catch (error) {
            console.log(error);
            callback(null);
        }
    },

        getBlueprintsByNameAndAuthor: async function(author, name, callback){
            try {
                const r = await axios.get(API+"/"+author+"/"+name);
                if(r && r.data) {
                    callback(r.data.description);
                } 
            } catch (error) {
                alert(error.data);
            }
        },
        updateBlueprint: async function(author, bpname, blueprint, callback){
            try {
                const r = await axios.put(API+"/"+author+"/"+bpname, blueprint);
                if(r && r.data) {
                    callback(r.data.description);
                } 
            } catch (error) {
                alert(error.data);
            }
        },
        createBlueprint: async function(bp, callback){
            try {
                const r = await axios.post(API,bp);
                if(r && r.data) {
                    callback(r.data.description);
                } 
            } catch (error) {
                alert(error.data);
            }
        },
        deleteBlueprint: async function(author,name, callback){
            try {
                console.log(author+name);
                const r = await axios.delete(API+"/"+author+"/"+name);
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