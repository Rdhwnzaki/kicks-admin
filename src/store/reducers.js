import { combineReducers } from "redux";
import Login from "./auth/login/reducer"
import Product from "./product/reducer";

const rootReducer = combineReducers({
    Login,
    Product,
});

export default rootReducer;
