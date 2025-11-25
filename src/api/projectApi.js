import api from "./axios";

export const projectApi = {
    list: async (q = "") => {
        const res = await api.get("/projects", {
            params: { q }
        });

        return res.data;
    },

    create: async (data) => {
        const res = await api.post("/projects", data);

        return res.data;
    },

    detail: async (id) => {
        const res = await api.get(`/projects/${id}`);

        return res.data;
    },

    update: async (id, data) => {
        const res = await api.put(`/projects/${id}`, data);

        return res.data;
    },

    remove: async (id) => {
        const res = await api.delete(`/projects/${id}`);

        return res.data;
    },

    generateModel: async (projectId, body) => {
        const res = await api.post(`/projects/${projectId}/model`, body);
        return res.data.data;
    },

    getTestCases: async (projectId) => {
        const res = await api.get(`/projects/${projectId}/testcases`);
        return res.data.data;
    },
};