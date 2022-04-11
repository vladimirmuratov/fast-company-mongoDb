import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

type TProps = {
    component: any;
    exact: boolean;
    path: string;
}

export const ProtectedRoute: React.FC<TProps> = ({component: Component, children, ...rest}): JSX.Element => {
    const {isLoggedIn} = useSelector((state: RootState) => state.users)

    return(
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn){
                    return <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }}
                    />
                }
                return Component ? <Component {...props}/> : children
            }}
        />
    )
}