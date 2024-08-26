import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    GET_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ADD_NEW_PRODUCT,
} from "./actionType";

import {
    getProductSuccess,
    getProductFail,
    deleteProductSuccess,
    deleteProductFail,
    updateProductSuccess,
    updateProductFail,
    addProductSuccess,
    addProductFail,
} from "./action";

//Include Both Helper File with needed methods
import {
    getProductApi,
    updateProductApi,
    deleteProductApi,
    addNewProductApi
} from "../../helpers/backend_helper";

function* getProduct({ payload: product }) {
    try {
        const response = yield call(getProductApi, product);
        yield put(getProductSuccess(GET_PRODUCT, response.data));
    } catch (error) {
        yield put(getProductFail(GET_PRODUCT, error));
    }
}

function* onUpdateProduct({ payload: product }) {
    try {
        const response = yield call(updateProductApi, product);
        yield put(updateProductSuccess(response));
        toast.success(response.message, { autoClose: 3000 });
    } catch (error) {
        yield put(updateProductFail(error));
        toast.error(error.response.data.message, { autoClose: 3000 });
    }
}

function* onDeleteProduct({ payload: product }) {
    try {
        const response = yield call(deleteProductApi, product);
        yield put(deleteProductSuccess({ product, ...response }));
        toast.success(response.message, { autoClose: 3000 });
    } catch (error) {
        yield put(deleteProductFail(error));
        toast.error(error.response.data.message, { autoClose: 3000 });
    }
}

function* onAddNewProduct({ payload: product }) {
    try {
        const response = yield call(addNewProductApi, product);
        yield put(addProductSuccess(response));
        toast.success(response.message, { autoClose: 3000 });
    } catch (error) {
        yield put(addProductFail(error));
        toast.error(error.response.data.message, { autoClose: 3000 });
    }

}

export function* watchGetProduct() {
    yield takeEvery(GET_PRODUCT, getProduct);
}

export function* watchUpdateProduct() {
    yield takeEvery(UPDATE_PRODUCT, onUpdateProduct);
}

export function* watchDeleteProduct() {
    yield takeEvery(DELETE_PRODUCT, onDeleteProduct);
}

export function* watchAddNewProduct() {
    yield takeEvery(ADD_NEW_PRODUCT, onAddNewProduct);
}

function* productSaga() {
    yield all([
        fork(watchGetProduct),
        fork(watchDeleteProduct),
        fork(watchUpdateProduct),
        fork(watchAddNewProduct)
    ]);
}

export default productSaga;
