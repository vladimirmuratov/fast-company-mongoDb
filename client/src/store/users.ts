import {createAction, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../types";
import {TUsersState} from "./types/users";
import {userService} from "../services/user.service";
import {RootState} from "./createStore";
import {authService} from "../services/auth.service";
import {localStorageService} from "../services/localStorage.service";
import {randomInt} from "../utils/random-int";
import {history} from "../utils/history";
import {generateAuthError} from "../utils/generateAuthError";

const authStatus = localStorageService.getAccessToken() ? {userId: localStorageService.getUserId()} : null

const initialState: TUsersState = {
    entities: null as unknown as Array<IUser>,
    isLoading: false,
    error: null,
    auth: authStatus,
    isLoggedIn: false,
    currentUser: {} as IUser,
    dataLoaded: false
}

const userCreateRequested = createAction("user/userCreateRequested")
const userCreateFailed = createAction("user/userCreateFailed")
const userUpdateRequested = createAction("users/userUpdateRequested")

const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.isLoading = false
            state.entities = action.payload
            state.dataLoaded = true
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequested: (state) => {
            state.error = null
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        currentUser: (state, action) => {
            state.currentUser = action.payload
            state.isLoggedIn = true
        },
        userLogout: (state) => {
            state.entities = null as unknown as Array<IUser>
            state.isLoggedIn = false
            state.currentUser = {} as IUser
            state.auth = null
            state.dataLoaded = false
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
                ] = action.payload;
        },
        userUpdateFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const {actions, reducer: usersReducer} = usersSlice
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    currentUser,
    userLogout,
    userUpdateSuccessed,
    userUpdateFailed
} = actions

const getCurrentUser = (dispatch: any, getState: any) => {
    const userId = localStorageService.getUserId()
    const state: RootState = getState()
    if (userId && state.users.entities) {
        const currUser = state.users.entities.find(u => u._id === userId)
        dispatch(currentUser(currUser))
    }
}

export const login = ({payload, redirect}: any) => async (dispatch: any, getState: any) => {
    const {email, password} = payload
    dispatch(authRequested())
    try {
        const data = await authService.login({email, password})
        dispatch(authRequestSuccess({userId: data.localId}))
        localStorageService.setTokens(data)
        dispatch(loadUsersList())
        getCurrentUser(dispatch, getState)
        history.push(redirect)
    } catch (error: any) {
        const {code, message} = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
}

export const logout = () => (dispatch: any) => {
    localStorageService.removeAuthData()
    dispatch(userLogout())
    history.push("/")
}

export const signUp = (payload: any) => async (dispatch: any) => {
    dispatch(authRequested())
    try {
        const data = await authService.register(payload)
        localStorageService.setTokens(data)
        dispatch(authRequestSuccess({userId: data.userId}))
        dispatch(loadUsersList())
        history.push("/users")
    } catch (error: any) {
        dispatch(authRequestFailed(error.message))
    }
}


export const loadUsersList = () => async (dispatch: any, getState: any) => {
    try {
        dispatch(usersRequested())
        const {content} = await userService.fetch()
        dispatch(usersReceived(content))
        getCurrentUser(dispatch, getState)
    } catch (error: any) {
        dispatch(usersRequestFailed(error.message))
    }
}

export const getUserById = (userId: string) => (state: RootState) => {
    if (state.users.entities) {
        return state.users.entities.find(u => u._id === userId)
    }
}

export const updateUser = (payload: any) => async (dispatch: any, getState: any) => {
    const state: RootState = getState()
    const userId = state.users.currentUser._id
    dispatch(userUpdateRequested());
    try {
        const {content} = await userService.update(payload, userId);
        dispatch(userUpdateSuccessed(content));
        dispatch(loadUsersList())
        history.push(`/users/${content._id}`);
    } catch (error: any) {
        dispatch(userUpdateFailed(error.message));
    }
};

export default usersReducer