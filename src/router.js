import React from 'react';
import { BrowserRouter, MemoryRouter, Switch, Route, Redirect, Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CadastroPage from './pages/CadastroPage';
import CadastroViewPage from './pages/CadastroViewPage';
import CadastroEditPage from './pages/CadastroEditPage';
import CardPage from './pages/CardPage';
import PreviewPage from './pages/PreviewPage';
import EditPage from './pages/EditPage';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './firebase/PrivateRoute';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

const Routes = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
        <Switch>
                <PrivateRoute exact path={'/'} component={HomePage} />
                <Route exact path={'/login'} component={LoginPage} />
                <PrivateRoute exact path={'/cadastro'} component={CadastroPage} />
                <PrivateRoute exact path={'/view'} component={CadastroViewPage} />
                <PrivateRoute exact path={'/edit'} component={CadastroEditPage} />
                <PrivateRoute exact path={'/card'} component={CardPage} />
                <Route exact path={'/preview/:id'} component={PreviewPage} />
                <Route component={NotFoundPage} />
                <PrivateRoute exact path={'/edit/:id'} component={EditPage} />
        </Switch>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default Routes;