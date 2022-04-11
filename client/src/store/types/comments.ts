import {TComment} from "../../types";

export type TCommentsState = {
    entities: null | Array<TComment>;
    isLoading: boolean;
    error: null | string;
}