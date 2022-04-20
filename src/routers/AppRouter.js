import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { TableScreen } from '../components/screen/TableScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const { token } = useSelector(state => state.auth)

    useEffect(() => {

        if (token) {
            dispatch(login(token));
            setisLoggedIn(true);
        }
        else {
            setisLoggedIn(false);
        }
        setChecking(false);
    }, [dispatch, setChecking, setisLoggedIn, token])

    if (checking) {
        return (
            <h1>Espere....</h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path="/" isAuthenticated={isLoggedIn} component={TableScreen} />

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
