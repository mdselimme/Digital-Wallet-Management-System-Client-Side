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

        //user login
        authLoginUser: builder.mutation({
            query:(payload)=>({
                url: "/auth/login",
                method: "POST",
                data:payload
            })
        }),

        //user logout
        authLogOutUser: builder.mutation({
            query:(payload)=>({
                url: "/auth/logout",
                method: "POST",
                data:payload
            })
        }),

        //user password reset
        authPasswordReset: builder.mutation({
            query:(payload)=>({
                url: "/auth/reset-password",
                method: "POST",
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
    useAuthLoginUserMutation,
    useUserGetMeQuery,
    useAuthLogOutUserMutation,
    useAuthPasswordResetMutation
}  = authApi;