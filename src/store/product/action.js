import {
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ADD_NEW_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    PRODUCT_LOADING,
    PRODUCT_RESET,
} from "./actionType";

export const resetProductState = (actionType) => ({
    type: PRODUCT_RESET,
    payload: { actionType },
});

export const getProductSuccess = (actionType, data) => ({
    type: GET_PRODUCT_SUCCESS,
    payload: { actionType, data },
});

export const getProductFail = (actionType, error) => ({
    type: GET_PRODUCT_FAIL,
    payload: { actionType, error },
});

export const getProduct = data => ({
    type: GET_PRODUCT,
    payload: data,
});

export const getProductLoading = () => ({
    type: PRODUCT_LOADING
});

export const deleteProduct = data => ({
    type: DELETE_PRODUCT,
    payload: data,
});

export const deleteProductSuccess = data => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: data,
});

export const deleteProductFail = error => ({
    type: DELETE_PRODUCT_FAIL,
    payload: error,
});

export const updateProduct = data => ({
    type: UPDATE_PRODUCT,
    payload: data,
});

export const updateProductFail = error => ({
    type: UPDATE_PRODUCT_FAIL,
    payload: error,
});

export const updateProductSuccess = data => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: data,
});

export const addNewProduct = data => ({
    type: ADD_NEW_PRODUCT,
    payload: data,
});

export const addProductSuccess = data => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: data,
});

export const addProductFail = error => ({
    type: ADD_PRODUCT_FAIL,
    payload: error,
});
