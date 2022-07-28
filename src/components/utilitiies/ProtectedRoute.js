import propTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component, path }) => {
    const isLoggedIn = useSelector(state => state.auth.token);
    return isLoggedIn ? <Route component={component} path={path} /> : <Redirect to="/" />;
};

ProtectedRoute.propTypes = {
    component: propTypes.object.isRequired,
    path: propTypes.string.isRequired,
};

export default ProtectedRoute;
