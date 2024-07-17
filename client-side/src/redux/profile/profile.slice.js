// profile.slice.js

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../types/types';

/**
 * @typedef {Object} ProfileStateType
 * @property {Profile[]} profiles
 */

/** @type {ProfileStateType} */
const initialState = { profiles: [] };

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile[]>} action
         */
        setProfile: (state, action) => {
            state.profiles = action.payload;
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile>} action
         */
        addprofile: (state, action) => {
            state.profiles.push(action.payload);
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<Profile>} action
         */
        updateprofile: (state, action) => {
            const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
            if (index !== -1) {
                state.profiles[index] = action.payload;
            }
        },
        /**
         * @param {ProfileStateType} state
         * @param {PayloadAction<string>} action
         */
        deleteprofile: (state, action) => {
            const index = state.profiles.findIndex(profile => profile.id === action.payload);
            if (index !== -1) {
                state.profiles.splice(index, 1);
            }
        }
    }
});

export const { setProfile, addprofile, updateprofile, deleteprofile } = profileSlice.actions;
export default profileSlice.reducer;
