import React, {useEffect} from "react";
import {Comment} from "../comment/comment";
import {orderBy} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {loadCommentsList} from "../../../store/comments";
import {useParams} from "react-router-dom";
import {RootState} from "../../../store/createStore";

export const CommentsList: React.FC = (): JSX.Element => {
    const {id: pageId} = useParams<{id: string}>()
    const dispatch = useDispatch()
    const {entities: comments} = useSelector((state: RootState) => state.comments)
    const sortedComments = orderBy(comments, ["created_at"], ["desc"])

    useEffect(() => {
        dispatch(loadCommentsList(pageId))
    }, [dispatch, pageId])

    return (
        <>
            {comments?.length
                ? (<div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr/>
                        {sortedComments.map(comment => {
                            console.log('comment', comment)
                            return <Comment key={comment._id} {...comment}/>
                        })}
                    </div>
                </div>)
                : (<div className="card mb-3">
                    <div className="card-body ">
                        <h2>No comments</h2>
                    </div>
                </div>)
            }
        </>
    )
}