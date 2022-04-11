import React from "react";
import {UserCard} from "../user-card/user-card";
import {UserQualitiesCard} from "../user-qualities-card/user-qualities-card";
import {UserMeetingsCard} from "../user-meetings-card/user-meetings-card";
import {IUser} from "../../../../types";
import {CommentsList} from "../../comments-list/comments-list";
import {AddCommentForm} from "../../add-comment-form/add-comment-form";

type TOnChange = {
    onChange: () => void;
}

type TProps = IUser & TOnChange;

export const UserInfoCard: React.FC<TProps> = ({_id, name, image, profession, qualities, completedMeetings, rate, onChange}): JSX.Element => {

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard
                        id={_id}
                        name={name}
                        image={image}
                        profession={profession}
                        rate={rate}
                        onChange={onChange}
                    />
                    <UserQualitiesCard qualities={qualities}/>
                    <UserMeetingsCard completedMeetings={completedMeetings}/>
                </div>
                <div className="col-md-8">
                    <AddCommentForm/>
                    <CommentsList/>
                </div>
            </div>
        </div>
    )
}