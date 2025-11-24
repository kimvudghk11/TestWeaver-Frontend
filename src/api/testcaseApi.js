import api from "./axios";

export const testcaseApi = {
    generate: async (data) => {
        const res = await api.post("/testcases/generate", data);

        return res.data.data;
    },

    getSet: async (id) => {
        const res = await api.get(`/testcases/${id}`);

        return res.data.data;
    },

    export: async (id, type) => {
        return api.get(`/testcases/${id}/export`, {
            params: { type },
            responseType: "blob",
        });
    },
};