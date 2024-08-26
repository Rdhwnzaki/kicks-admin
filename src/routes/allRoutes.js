import React from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages";
import Product from "../pages/Product";
import Order from "../pages/Order";

const publicRoutes = [
    { path: "/order", component: <Order /> },
    { path: "/product", component: <Product /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/login", component: <Login /> },
    {
        path: "/",
        exact: true,
        component: <Navigate to='/login' />,
    },
    { path: "*", component: <Navigate to='/login' /> },
];

export { publicRoutes };

