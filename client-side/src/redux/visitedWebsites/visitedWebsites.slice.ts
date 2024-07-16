import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { VisitedWebsites} from '../../types/types'

type visitedWebsitesStateType = {
    visitedWebsites: VisitedWebsites[]
}

const initialState: visitedWebsitesStateType = { visitedWebsites:[] }

const visitedWebsiteSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setvisitedWebsite: (state, action: PayloadAction<VisitedWebsites[]>) => {
            state.visitedWebsites = action.payload;
        },
        addvisitedWebsite: (state, action: PayloadAction<VisitedWebsites>) => {
            state.visitedWebsites.push(action.payload)
        },
        updatevisitedWebsite: (state, action: PayloadAction<VisitedWebsites>) => {
            const index = state.visitedWebsites.findIndex(visitedWebsite => visitedWebsite.id === action.payload.id);
            if (index !== -1) {
                state.visitedWebsites[index] = action.payload;
            }
        },
        deletevisitedWebsite: (state, action: PayloadAction<string>) => {
            const index = state.visitedWebsites.findIndex(visitedWebsite => visitedWebsite.id === action.payload);
            if (index !== -1) {
                state.visitedWebsites.splice(index, 1);
            }
        }
    }
})

export const { setvisitedWebsite, addvisitedWebsite, updatevisitedWebsite, deletevisitedWebsite } = visitedWebsiteSlice.actions
export default visitedWebsiteSlice.reducer
