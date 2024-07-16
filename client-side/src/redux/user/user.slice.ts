import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {User} from '../../types/types'

type UserStateType={
    users:User[]
}

const initialState: UserStateType = { users: []}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser:(state,action: PayloadAction<User[]>)=>{
            state.users=action.payload;
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index=state.users.findIndex(c=>c.id===action.payload.id)
            if (index !== -1) {
            state.users[index]=action.payload
            }
        },
        deleteUser:(state,action: PayloadAction<string>)=>{
            const index=state.users.findIndex(c=>c.id===action.payload)
            if (index !== -1) {
            state.users.slice(index,1)
            }
        },
    }
})
export const {setUser,addUser,updateUser,deleteUser}=userSlice.actions
export default userSlice.reducer