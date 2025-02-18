


import { apiSlice } from "../slices/Apislice.js";
import { 
    ADMIN_AUTHENTICATION_URL,
    ADMIN_LOGOUT_URL,
    ADMIN_REGISTRATION_URL,
    ADMIN_PROFILE_URL,
    ADMIN_USERS_DATA_FETCH_URL,
    ADMIN_DELETE_USER_URL,
    ADMIN_UPDATE_USER_URL,
    ADMIN_ADD_USER
} from '../utils/constants.js';


export const adminApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        adminLogin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_AUTHENTICATION_URL,
                method: 'POST',
                body: data
            })

        }),
        adminLogout: builder.mutation({
            
            query: () => ({
                url: ADMIN_LOGOUT_URL,
                method: 'POST'
            })

        }),
        adminRegister: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_REGISTRATION_URL,
                method: 'POST',
                body: data
            })

        }),
        updateAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_PROFILE_URL,
                method: 'PUT',
                body: data
            })

        }),
        getUsersData: builder.mutation({
            
            query: () => ({
                url: ADMIN_USERS_DATA_FETCH_URL,
                method: 'POST'
            })

        }),
        deleteUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_DELETE_USER_URL,
                method: 'POST',
                body: data
            })

        }),
        updateUserByAdmin: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_UPDATE_USER_URL,
                method: 'PUT',
                body: data
            })

        }),
        addUser: builder.mutation({
            
            query: (data) => ({
                url: ADMIN_ADD_USER,
                method: 'POST',
                body: data
            })

        }),

    })

})


export const {

    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRegisterMutation,
    useUpdateAdminMutation,
    useGetUsersDataMutation,
    useDeleteUserMutation,
    useUpdateUserByAdminMutation,
    useAddUserMutation

} = adminApiSlice;