import {IPofObj} from "../../types";

export type TProfessionsState = {
    entities: Array<IPofObj>;
    isLoading: boolean;
    error: string | null;
}