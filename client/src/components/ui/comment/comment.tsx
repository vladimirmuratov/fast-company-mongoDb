import React from "react";
import {TComment} from "../../../types";
import {displayDate} from "../../../utils/displayDate";
import {getUserById} from "../../../store/users";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/createStore";
import {loadCommentsList, removeComment} from "../../../store/comments";
import {useParams} from "react-router-dom";

type TProps = TComment

export const Comment: React.FC<TProps> = ({_id, content, created_at, userId}): JSX.Element => {
   /* console.log(_id)
    console.log(content)
    console.log(createdAt)
    console.log(userId)*/
    const dispatch = useDispatch()
    const {id: pageId} = useParams<{ id: string }>()
    const {currentUser} = useSelector((state: RootState) => state.users)
    const user = useSelector(getUserById(userId))

    const handleRemoveComment = async (id: string | undefined) => {
        await dispatch(removeComment(id))
        await dispatch(loadCommentsList(pageId))
    }

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img src={user?.image} alt="avatar" height="40"/>
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user?.name}
                                        <span className="small ms-5">
                                            {displayDate(created_at)}
		                              </span>
                                    </p>
                                    {currentUser?._id === userId && (<button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => handleRemoveComment(_id)}
                                    >
                                        <i className="bi bi-x-lg"/>
                                    </button>)}
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}