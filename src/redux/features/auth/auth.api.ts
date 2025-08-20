import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
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
    })
});

export const {
    useAuthLoginUserMutation,
    useAuthLogOutUserMutation,
    useAuthPasswordResetMutation
}  = authApi;