import {IUser} from "../../types";

export type TUsersState = {
    entities: Array<IUser>;
    isLoading: boolean;
    error: string | null;
    auth: any;
    isLoggedIn: boolean;
    currentUser: IUser;
    dataLoaded: boolean;
}