import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Preference } from '../../types/types'

type preferenceStateType = {
    preferences: Preference[]
}

const initialState: preferenceStateType = { preferences:[] }

const preferenceSlice = createSlice({
    name: 'preference',
    initialState,
    reducers: {
        setpreferenceSlice: (state, action: PayloadAction<Preference[]>) => {
            state.preferences = action.payload;
        },
        addpreferenceSlice: (state, action: PayloadAction<Preference>) => {
            state.preferences.push(action.payload)
        },
        updatepreferenceSlice: (state, action: PayloadAction<Preference>) => {
            const index = state.preferences.findIndex(profile => profile.id === action.payload.id);
            if (index !== -1) {
                state.preferences[index] = action.payload;
            }
        },
        deletepreferenceSlice: (state, action: PayloadAction<string>) => {
            const index = state.preferences.findIndex(profile => profile.id === action.payload);
            if (index !== -1) {
                state.preferences.splice(index, 1);
            }
        }
    }
})

export const { setpreferenceSlice, addpreferenceSlice, updatepreferenceSlice, deletepreferenceSlice } = preferenceSlice.actions
export default preferenceSlice.reducer