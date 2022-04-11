import httpService from "./http.service";
import {localStorageService} from "./localStorage.service";

const userEndPoint = "user/"

export const userService = {
    fetch: async () => {
        const {data} = await httpService.get(userEndPoint)
        return data
    },
    create: async (payload: any) => {
        const {data} = await httpService.put(userEndPoint + payload._id, payload)
        return data
    },
    getCurrentUser: async () => {
        const {data} = await httpService.get(userEndPoint + localStorageService.getUserId())
        return data
    },
    update: async (payload: any, currentUserId: string) => {
        const {data} = await httpService.patch(userEndPoint + currentUserId, payload)
        return data
    }
}