import { APIClient } from "./api_helper";

const api = new APIClient();
export const getLoggedInUser = () => {
    const user = sessionStorage.getItem("user");
    if (user) return JSON.parse(user);
    return null;
};

export const isUserAuthenticated = () => {
    return getLoggedInUser() !== null;
};


export const postLogin = (data) => api.post(`/auth/login`, data);

export const getProductApi = (data) => api.get(`/product`, data);
export const addNewProductApi = (data) => api.postImg(`/product`, data);
export const updateProductApi = (data) => api.patchImg(`/product`, data);
export const deleteProductApi = (data) => api.delete(`/product`, data);
