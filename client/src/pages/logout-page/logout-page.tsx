import React, {useEffect} from "react";
import {Loader} from "../../components/common/loader/loader";
import {useDispatch} from "react-redux";
import {logout} from "../../store/users";

export const LogoutPage: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [dispatch])

    return <Loader/>
}