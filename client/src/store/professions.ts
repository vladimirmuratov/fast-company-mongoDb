import {createSlice} from "@reduxjs/toolkit";
import {IPofObj} from "../types";
import {TProfessionsState} from "./types/professions";
import {professionService} from "../services/profession.service";
import {RootState} from "./createStore";

const initialState: TProfessionsState = {
    entities: null as unknown as Array<IPofObj>,
    isLoading: false,
    error: null
}

const professionsSlice = createSlice({
    name: "professions",
    initialState: initialState,
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const {actions, reducer: professionsReducer} = professionsSlice
const {professionsRequested, professionsReceived, professionsRequestFailed} = actions

export const loadProfessionsList = () => async (dispatch: any) => {
    try {
        dispatch(professionsRequested())
        const {content} = await professionService.fetch()
        dispatch(professionsReceived(content))
    } catch (error: any) {
        dispatch(professionsRequestFailed(error.message))
    }
}

export const getProfession = (id: any) => (state: RootState) => {
    if (state.professions.entities) {
        return state.professions.entities.find(p => p._id === id)
    }
}

export default professionsReducer