import { all, fork } from "redux-saga/effects";

import LoginSaga from "./auth/login/saga"
import ProductSaga from "./product/saga";

export default function* rootSaga() {
    yield all([
        fork(LoginSaga),
        fork(ProductSaga),
    ]);
}
