import {TComment} from "../types";
import httpService from "./http.service";

const commentEndPoint = "comment/"

export const commentService = {
    createComment: async (payload: TComment) => {
        const {data} = await httpService.post(commentEndPoint, payload)
        return data
    },
    getComments: async (pageId: string) => {
        const {data} = await httpService.get(commentEndPoint, {
            params: {
                orderBy: "pageId",
                equalTo: pageId
            }
        })
        return data
    },
    removeComment: async (commentId: string | undefined) => {
        const {data} = await httpService.delete(commentEndPoint + commentId)
        return data
    }
}