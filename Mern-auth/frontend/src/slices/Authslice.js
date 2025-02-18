import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload))  
        },
        logout : (state,action) =>{
         state.userInfo = null;
         localStorage.removeItem('userInfo')
        }
    }
})

export const { setCredentials , logout } = authSlice.actions
//when we call the actions it changes the state that is reducer

export default authSlice.reducer