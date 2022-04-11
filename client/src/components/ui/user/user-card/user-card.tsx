import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/createStore";
import {getProfession} from "../../../../store/professions";

type TProps = {
    id: string;
    name: string;
    image: string;
    profession: any;
    rate: number;
    onChange: () => void;
}

export const UserCard: React.FC<TProps> = ({id, name, image, profession, rate, onChange}): JSX.Element => {
    const {currentUser} = useSelector((state: RootState) => state.users)
    const prof = useSelector(getProfession(profession))

    return (
        <div className="card mb-3">
            <div className="card-body">
                {id === currentUser?._id && (
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={onChange}>
                        <i className="bi bi-gear"/>
                    </button>)}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{prof?.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" role="button"/>
                            <i className="bi bi-caret-up text-secondary" role="button"/>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}