import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        
        // user register 
        userRegister: builder.mutation({
            query:(payload)=>({
                url: "/user/register",
                method:"POST",
                data:payload
            })
        }),

        //get me user
        userGetMe: builder.query({
            query: () => ({
                url: "/user/me"
            })
        })

    })
});

export const {
    useUserRegisterMutation,
    useUserGetMeQuery
}  = authApi;