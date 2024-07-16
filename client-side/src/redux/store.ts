import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile/profile.slice.ts'
import VisitedWebsitesReducer from './visitedWebsites/visitedWebsites.slice.ts'
import userReducer from './user/user.slice.ts'
import preferenceReducer from './preference/preference.slice.ts'
import authReducer from './auth/auth.slice'
import { TypedUseSelectorHook,useSelector } from 'react-redux'
export const store = configureStore({
    reducer: {
        profile:profileReducer,
        preference:preferenceReducer,
        user:userReducer,
        visitedWebsites:VisitedWebsitesReducer,
        auth:authReducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector