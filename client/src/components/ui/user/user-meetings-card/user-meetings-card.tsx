import React from "react";

type TProps = {
    completedMeetings: number;
}

export const UserMeetingsCard: React.FC<TProps> = ({completedMeetings}): JSX.Element => (
    <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
                <span>Completed meetings</span>
            </h5>
            <h1 className="display-1">{completedMeetings}</h1>
        </div>
    </div>
)