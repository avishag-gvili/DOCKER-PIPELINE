// auth.slice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthUser } from "../../types/types.js";

/**
 * @typedef {Object} AuthStateType
 * @property {AuthUser|null} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isInitialized
 */

/** @type {AuthStateType} */
const initialState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * @param {AuthStateType} state
         * @param {PayloadAction<AuthUser>} action
         */
        setCurentUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        /**
         * @param {AuthStateType} state
         */
        setInitialized: (state) => {
            state.isInitialized = true;
        },
        /**
         * @param {AuthStateType} state
         */
        deleteCurentUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = false;
        },
        /**
         * @param {AuthStateType} state
         * @param {PayloadAction<AuthUser>} action
         */
        updateCurentUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setCurentUser, setInitialized, deleteCurentUser, updateCurentUser } = authSlice.actions;

export default authSlice.reducer;
