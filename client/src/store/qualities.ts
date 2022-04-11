import {createSlice} from "@reduxjs/toolkit";
import {TQualitiesState} from "./types/qualities";
import {qualityService} from "../services/quality.service";
import {IQualityObj} from "../types";
import {RootState} from "./createStore";

const initialState: TQualitiesState = {
    entities: null as unknown as Array<IQualityObj>,
    isLoading: false,
    error: null,
    lastFetch: null
}


const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: initialState,
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true
        },
        qualitiesReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.lastFetch = Date.now()
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const {actions, reducer: qualitiesReducer} = qualitiesSlice
const {qualitiesRequested, qualitiesReceived, qualitiesRequestFailed} = actions

function isOutDated(date: number) {
    return Date.now() - date > 10 * 60 * 1000;
}

export const loadQualitiesList = () => async (dispatch: any, getState: any) => {
    const {lastFetch} = getState().qualities
    if (isOutDated(lastFetch)) {
        dispatch(qualitiesRequested())
        try {
            const {content} = await qualityService.fetchAll()
            dispatch(qualitiesReceived(content))
        } catch (error: any) {
            dispatch(qualitiesRequestFailed(error.message))
        }
    }
}

export const getQualities = (ids: Array<any>) => (state: RootState) => {
    const qualitiesAll = state.qualities.entities
    const newArray: Array<IQualityObj> = []
    ids?.forEach(id => {
        qualitiesAll?.forEach(q => {
            if (id === q._id) newArray.push(q)
        })
    })
    return newArray
}

export default qualitiesReducer