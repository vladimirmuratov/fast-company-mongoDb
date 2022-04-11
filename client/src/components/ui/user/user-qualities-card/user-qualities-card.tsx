import React from "react";
import {QualitiesList} from "../../qualities/qualities-list/qualities-list";
import {IQualityObj} from "../../../../types";

type TProps = {
    qualities: Array<IQualityObj>;
}

export const UserQualitiesCard: React.FC<TProps> = ({qualities}): JSX.Element => (
    <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
                <span>Qualities</span>
            </h5>
            <p className="card-text">
                <QualitiesList qualities={qualities}/>
            </p>
        </div>
    </div>
)