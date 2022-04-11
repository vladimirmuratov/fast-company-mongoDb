import React, {FC, useCallback} from "react";
import {useHistory, useParams} from "react-router-dom";
import {IUser} from "../../../../types";
import {Loader} from "../../../common/loader/loader";
import {UserInfoCard} from "../user-info-card/user-info-card";
import {getUserById} from "../../../../store/users";
import {useSelector} from "react-redux";

export const User: FC = (): JSX.Element => {
    const history = useHistory()
    const {id} = useParams<{ id: string }>()
    const user: IUser | undefined = useSelector(getUserById(id))

    const handleGoToEditPage = useCallback(() => {
        history.push({pathname: `/users/${id}/edit`})
    }, [history, id])

    return (
        <>
            {user
                ? (<UserInfoCard {...user} onChange={handleGoToEditPage}/>)
                : (<Loader/>)
            }
        </>
    )
}

