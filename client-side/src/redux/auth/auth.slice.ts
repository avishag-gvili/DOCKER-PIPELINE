import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/types";

type AuthStateType = {
    user: AuthUser | null,
    isAuthenticated: boolean,
    isInitialized: boolean
}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCurentUser: (state: AuthStateType, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        setInitialized: (state: AuthStateType) => {
            state.isInitialized = true
        },
        deleteCurentUser:(state: AuthStateType) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = false;
        },
        updateCurentUser: (state: AuthStateType, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        }
    }
})

export const { setCurentUser, setInitialized,deleteCurentUser,updateCurentUser} = authSlice.actions

export default authSlice.reducer