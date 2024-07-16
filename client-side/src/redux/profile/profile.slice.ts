import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile } from '../../types/types'

type profileStateType = {
    profiles: Profile[]
}

const initialState: profileStateType = { profiles:[] }

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile[]>) => {
            state.profiles = action.payload;
        },
        addprofile: (state, action: PayloadAction<Profile>) => {
            state.profiles.push(action.payload)
        },
        updateprofile: (state, action: PayloadAction<Profile>) => {
            const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
            if (index !== -1) {
                state.profiles[index] = action.payload;
            }
        },
        deleteprofile: (state, action: PayloadAction<string>) => {
            const index = state.profiles.findIndex(profile => profile.id === action.payload);
            if (index !== -1) {
                state.profiles.splice(index, 1);
            }
        }
    }
})

export const { setProfile, addprofile, updateprofile, deleteprofile } = profileSlice.actions
export default profileSlice.reducer
