import axios from "axios";
import { api } from "../config";
import { getToken, setAuthorization } from "./utils/token";

// Default Axios configuration
axios.defaults.baseURL = api.API_URL;
axios.defaults.timeout = 180000;
axios.defaults.headers.post["Content-Type"] = "application/json";

// Set the token if available
const token = getToken();
if (token) setAuthorization(token);

axios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        const originalRequest = error.config;

        if (error.response.status === 403 || error.response.status === 401) {
            window.location = "/logout";
            return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            window.location = "/logout";
        }
        return Promise.reject(error);
    }
);

class APIClient {
    async getOne(url, id) {
        return axios.get(`${url}/${id}`);
    }

    async get(url, params, path) {
        const token = getToken();
        if (token) setAuthorization(token);

        let paramKeys = [];
        if (path) url = url + path;

        if (params) {
            Object.keys(params).forEach((key) => {
                paramKeys.push(`${key}=${params[key]}`);
            });

            const queryString = paramKeys.length ? paramKeys.join("&") : "";
            return axios.get(`${url}?${queryString}`);
        } else {
            return axios.get(url);
        }
    }

    async getId(url, data) {
        return axios.get(`${url}/${data.id}`, data);
    }

    async post(url, data) {
        return axios.post(url, data);
    }

    async postImg(url, data) {
        return axios.post(url, data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    }

    async put(url, data) {
        return axios.put(`${url}/${data.id}`, data);
    }

    async patch(url, data) {
        return axios.patch(`${url}/${data.id}`, data);
    }

    async patchImg(url, data) {
        let id = data.id || data.get("id");

        return axios.patch(`${url}/${id}`, data, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
    }

    async delete(url, data) {
        const id = data.id || data;
        return axios.delete(`${url}/${id}`);
    }
}

export { APIClient, setAuthorization };
