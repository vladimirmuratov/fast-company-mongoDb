import {createSlice} from "@reduxjs/toolkit";
import {commentService} from "../services/comments.service";
import {TCommentsState} from "./types/comments";
import {TComment} from "../types";

const initialState: TCommentsState = {
    entities: null as unknown as Array<TComment>,
    isLoading: false,
    error: null
}

const commentsSlice = createSlice({
    name: "comments",
    initialState: initialState,
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addedNewComment: (state, action) => {
            state.entities?.push(action.payload)
            state.isLoading = false
        },
        removedComment: (state) => {
            state.isLoading = false
        }
    }
});

const {reducer: commentsReducer, actions} = commentsSlice;
const {commentsRequested, commentsReceived, commentsRequestFailed, addedNewComment, removedComment} = actions;

export const loadCommentsList = (userId: string) => async (dispatch: any) => {
    dispatch(commentsRequested());
    try {
        const {content} = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error: any) {
        dispatch(commentsRequestFailed(error.message));
    }
}

export const createComment = (payload: TComment) => async (dispatch: any) => {
    dispatch(commentsRequested())
    try {
        const {content} = await commentService.createComment(payload)
        dispatch(addedNewComment(content))
    } catch (error: any) {
        dispatch(commentsRequestFailed(error.message))
    }

}

export const removeComment = (commentId: string | undefined) => async (dispatch: any) => {
    dispatch(commentsRequested())
    try {
        const {content} = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(removedComment())
        }
    } catch (error: any) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export default commentsReducer;
