import {IUser} from "../types";

export function paginate(items: Array<IUser>, currentPage: number, pageSize: number) {
    const startIndex = (currentPage - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
}