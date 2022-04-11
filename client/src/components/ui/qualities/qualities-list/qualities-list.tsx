import React, {FC, useEffect} from "react";
import {IQualityObj} from "../../../../types";
import {Quality} from "../quality/quality";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/createStore";
import {getQualities, loadQualitiesList} from "../../../../store/qualities";

type TProps = {
    qualities: Array<IQualityObj>;
}

export const QualitiesList: FC<TProps> = ({qualities}): JSX.Element => {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state: RootState) => state.qualities)
    const qualitiesResult = useSelector(getQualities(qualities))

    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])

    return (
        <>
            {!isLoading
                ? qualitiesResult.map((item) => (
                    <Quality key={item._id} name={item.name} color={item.color}/>
                ))
                : <p>Loading...</p>
            }
        </>
    )
}