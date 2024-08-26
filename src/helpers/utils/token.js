import axios from "axios";

export const getToken = () => {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    return authUser ? authUser.token : null;
};

export const setAuthorization = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
