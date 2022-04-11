export interface IPofObj {
    _id: string;
    name: "Повар" | "Актер" | "Инженер" | "Физик" | "Официант" | "Доктор";
}

export type TProfessions = {
    readonly doctor: IPofObj;
    readonly waiter: IPofObj;
    readonly physics: IPofObj;
    readonly engineer: IPofObj;
    readonly actor: IPofObj;
    readonly cook: IPofObj;
}

export interface IQualityObj {
    _id: string;
    name: "Неуверенный" | "Красавчик" | "Алкоголик" | "Троль" | "Странный" | "Нудила";
    color: "dark" | "info" | "danger" | "success" | "secondary" | "primary";
}

export type TQualities = {
    readonly tedious: IQualityObj;
    readonly strange: IQualityObj;
    readonly buller: IQualityObj;
    readonly alcoholic: IQualityObj;
    readonly handsome: IQualityObj;
    readonly uncertain: IQualityObj;
}

export interface IUser {
    _id: string;
    image: string;
    name: string;
    email: string;
    sex: string;
    profession: IPofObj;
    qualities: Array<IQualityObj>;
    completedMeetings: number;
    rate: number;
    bookmark: boolean;
}

export interface ISortItem {
    path: "name" | "profession" | "completedMeetings" | "rate" | "bookmark";
    order: "asc" | "desc";
}

export type TGender = {
    name: "Male" | "Female" | "Other";
    value: "male" | "female" | "other";
}

export type TComment = {
    _id?: string | undefined;
    created_at?: string | undefined;
    userId: string;
    pageId: string;
    content: string;
}