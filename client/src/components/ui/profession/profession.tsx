import React from "react";
import {Loader} from "../../common/loader/loader";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {getProfession} from "../../../store/professions";

type TProps = {
    id: any;
}

export const Profession: React.FC<TProps> = ({id}): JSX.Element => {
    const {isLoading} = useSelector((state: RootState) => state.professions)
    const prof = useSelector(getProfession(id))
    return (
        <>
            {!isLoading
                ? <p>{prof?.name}</p>
                : <Loader/>
            }
        </>
    )
}