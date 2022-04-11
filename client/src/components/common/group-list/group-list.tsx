import React, {FC} from "react";
import {IPofObj} from "../../../types";
import {Loader} from "../loader/loader";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";

type TProps = {
    onCurrentProf: (item: IPofObj) => void;
    currentProf: IPofObj | undefined;
    onClear: () => void;
}

export const GroupList: FC<TProps> = ({onCurrentProf, currentProf, onClear}): JSX.Element => {
    const {entities: professions} = useSelector((state: RootState) => state.professions)

    return (
        <div style={{position: "relative"}}>
            <ul className="list-group m-2" style={{width: "200px"}} role="button">
                {professions?.length
                    ? professions.map(item =>
                        (<li key={item._id}
                            // @ts-ignore
                             className={"list-group-item" + (item.name === currentProf ? " active" : "")}
                             onClick={() => onCurrentProf(item)}
                        >
                            {item.name}
                        </li>))
                    : <Loader/>}
                {currentProf && <li className="btn btn-secondary" onClick={onClear}>Очистить</li>}
            </ul>
        </div>
    )
}