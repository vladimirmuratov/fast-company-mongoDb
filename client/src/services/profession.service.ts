import httpService from "./http.service";

const professionEndPoint = "profession/"

export const professionService = {
    fetch: async () => {
        const {data} = await httpService.get(professionEndPoint)
        return data
    }
}