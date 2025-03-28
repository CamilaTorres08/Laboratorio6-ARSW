import axios from "axios";

const API = "http://localhost:8080/v1/blueprints";

const apiclient = {
    getBlueprintsByAuthor: async (author, callback) => {
        try {
            const r = await axios.get(`${API}/${author}`);
            callback(r?.data?.description || null);
        } catch (error) {
            callback(null);
            console.error("Error en getBlueprintsByAuthor:", error.response?.data || error.message);
        }
    },
    
    getBlueprintsByNameAndAuthor: async (author, name, callback) => {
        try {
            const r = await axios.get(`${API}/${author}/${name}`);
            callback(r?.data?.description || null);
        } catch (error) {
            callback(null);
            console.error("Error en getBlueprintsByNameAndAuthor:", error.response?.data || error.message);
        }
    },

    updateBlueprint: async (author, bpname, blueprint, callback) => {
        try {
            const r = await axios.put(`${API}/${author}/${bpname}`, blueprint);
            callback(r?.data?.description || null);
        } catch (error) {
            callback(null);
            console.error("Error en update:", error.response?.data || error.message);
        }
    },

    createBlueprint: async (bp, callback) => {
        try {
            const r = await axios.post(API, bp);
            callback(r?.data?.description || null);
        } catch (error) {
            callback(null);
            console.error("Error en create:", error.response?.data || error.message);
        }
    },

    deleteBlueprint: async (author, name, callback) => {
        try {
            console.log(`${author}${name}`);
            const r = await axios.delete(`${API}/${author}/${name}`);
            callback(r?.data?.description || null);
        } catch (error) {
            callback(null);
            console.error("Error en delete:", error.response?.data || error.message);
        }
    },
};

export default apiclient;
