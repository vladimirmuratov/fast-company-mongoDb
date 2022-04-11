import React, {FC, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {MainPage} from "../../pages/main-page/mainPage";
import {LoginPage} from "../../pages/login-page/login-page";
import {UsersPage} from "../../pages/users-page/users-page";
import {NotFoundPage} from "../../pages/not-found-page/notFoundPage";
import {UserPage} from "../../pages/user-page/user-page";
import {Navbar} from '../ui/navbar/navbar';
import {EditPage} from "../../pages/edit-page/edit-page";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ProtectedRoute} from "../common/protected-route/protected-route";
import {LogoutPage} from "../../pages/logout-page/logout-page";
import {useDispatch} from "react-redux";
import {loadQualitiesList} from "../../store/qualities";
import {loadProfessionsList} from "../../store/professions";
import {loadUsersList} from "../../store/users";
import {localStorageService} from "../../services/localStorage.service";

const App: FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const accessToken = localStorageService.getAccessToken()

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
    }, [dispatch])

    useEffect(() => {
        accessToken && dispatch(loadUsersList())
    }, [dispatch, accessToken])

    return (<div className="d-flex flex-column">
        <Navbar/>
        <Switch>
            <Route exact path="/login/:type?" component={LoginPage}/>
            <Route exact path="/logout" component={LogoutPage}/>
            <ProtectedRoute exact path="/users" component={UsersPage}/>
            <ProtectedRoute exact path="/users/:id" component={UserPage}/>
            <ProtectedRoute exact path="/users/:id/edit" component={EditPage}/>
            <Route exact path="/" component={MainPage}/>
            <Route path="*" component={NotFoundPage}/>
        </Switch>
        <ToastContainer/>
    </div>)
}


export default App;
