import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //user login
        authLoginUser: builder.mutation({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                data: payload
            })
        }),
        //user logout
        authLogOutUser: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["user"]
        }),
        //user password reset
        authPasswordReset: builder.mutation({
            query: (payload) => ({
                url: "/auth/reset-password",
                method: "POST",
                data: payload
            })
        }),
    })
});

export const {
    useAuthLoginUserMutation,
    useAuthLogOutUserMutation,
    useAuthPasswordResetMutation
} = authApi;