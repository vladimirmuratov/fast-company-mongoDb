import {IQualityObj} from "../../types";

export type TQualitiesState = {
    entities: Array<IQualityObj>;
    isLoading: boolean;
    error: string | null;
    lastFetch: null | number;
}