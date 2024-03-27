import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/Authslice'
import adminAuthReducer from './slices/Adminauthslice'
import { apiSlice } from './slices/Apislice'

const store = configureStore(
    {
        reducer : {
            auth : authReducer,
            adminAuth: adminAuthReducer,
            [apiSlice.reducerPath] : apiSlice.reducer
        },//actions to change the state
        middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
        //thunk middleware
        devTools : true //to use redux dev tools
    }
)

export default store

//Queries : to fetch data drom backend
//mutations : to add users