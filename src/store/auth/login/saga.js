import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
} from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { setAuthorization } from "../../../helpers/api_helper";

import {
  postLogin,
} from "../../../helpers/backend_helper";


function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password,
    });
    if (response.message === "Login successful") {
      sessionStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      const token = response.token;
      if (token) setAuthorization(token);
      toast.success(response.message, { autoClose: 3000 });
    } else {
      yield put(apiError(response.message));
      toast.success(response.message, { autoClose: 3000 });
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
