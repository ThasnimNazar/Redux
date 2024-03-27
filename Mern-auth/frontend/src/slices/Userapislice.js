import { apiSlice } from "./Apislice";
//import like it as a parentslice
const USERS_URL = '/api/users'
//all endpoints starts for backend

export const userApiSlice = apiSlice.injectEndpoints({
    //querymutation
    endpoints : (builder)=>({
       login:builder.mutation({
        //login data like user name,password
        query : (data)=>({
            //data object
         url : `${USERS_URL}/auth`,
         method:'POST',
         body : data
         //In form we have to dispatch the login action
        })
       }),
       logout : builder.mutation({
        query :()=>({
           url : `${USERS_URL}/logout`,
           method : 'POST'
        }) 
       }),
       register : builder.mutation({
       query : (data)=>({
        url : `${USERS_URL}`,
        method : 'POST',
        body : data
       })
       }),
       updateUser:builder.mutation({
        query:(data)=>({
            url : `${USERS_URL}/profile`,
            method : 'PUT',
            body : data
        })
       })
    })

})
//create endpoints and inject them this is called dependency injection

export const { useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation } = userApiSlice;
//name of the mutation