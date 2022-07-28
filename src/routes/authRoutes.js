import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("../containers/Login"));

const NotFound = () => {
    return <Redirect to="/" />;
};

const AuthRoutes = () => {
    return (
        <Switch>
            <Suspense fallback={<div>Loading ...</div>}>
                <Route exact path="/" component={Login} />
                <Route exact path="*" component={NotFound} />
            </Suspense>
        </Switch>
    );
};

export default AuthRoutes;
