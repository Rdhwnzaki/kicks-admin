import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { publicRoutes } from "./allRoutes";
import ScrollToTop from "../components/ScrollTop";

const Index = () => {
    const location = useLocation();
    return (
        <React.Fragment>
            <ScrollToTop />
            <Routes location={location}>
                {publicRoutes.map((route, idx) => (
                    <Route path={route.path} element={route.component} key={idx} />
                ))}
            </Routes>
        </React.Fragment>
    );
};

export default Index;
