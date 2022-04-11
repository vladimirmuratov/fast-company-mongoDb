import httpService from "./http.service";


const qualityEndPoint = "quality/"

export const qualityService = {
    fetchAll: async () => {
        const {data} = await httpService.get(qualityEndPoint)
        return data
    }
}