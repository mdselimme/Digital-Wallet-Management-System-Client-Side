import { baseApi } from "@/redux/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // user register 
        userRegister: builder.mutation({
            query: (payload) => ({
                url: "/user/register",
                method: "POST",
                data: payload
            })
        }),
        // user update 
        userUpdate: builder.mutation({
            query: (payload) => ({
                url: `/user/update`,
                method: "PATCH",
                data: payload
            })
        }),
        // user update role
        userUpdateRole: builder.mutation({
            query: (body) => ({
                url: `/user/role?email=${body.email}`,
                method: "PATCH",
                data: { role: body.role }
            }),
            invalidatesTags: ["user"]
        }),
        // user update status
        userUpdateStatus: builder.mutation({
            query: (body) => ({
                url: `/user/status?email=${body.email}`,
                method: "PATCH",
                data: { userStatus: body.userStatus }
            }),
            invalidatesTags: ["user"]
        }),
        // user update status
        userUpdateActivity: builder.mutation({
            query: (body) => ({
                url: `/user/activity?email=${body.email}`,
                method: "PATCH",
                data: { isActive: body.isActive }
            }),
            invalidatesTags: ["user"]
        }),
        //get me user
        userGetMe: builder.query({
            query: () => ({
                url: "/user/me"
            }),
            providesTags: ["user"],
            transformResponse: (response) => response.data
        }),
        //get all users
        userGetAll: builder.query({
            query: (params) => ({
                url: "/user",
                method: "GET",
                params
            }),
            transformResponse: (response) => response.data,
            providesTags: ["user"]
        }),
        //get single user
        getSingleUser: builder.query({
            query: (body) => ({
                url: `/user/${body.id}`
            }),
            transformResponse: (response) => response.data
        }),
    })
});

export const {
    useUserRegisterMutation,
    useUserGetAllQuery,
    useUserUpdateActivityMutation,
    useUserUpdateStatusMutation,
    useUserUpdateMutation,
    useUserUpdateRoleMutation,
    useGetSingleUserQuery,
    useUserGetMeQuery,
} = userApi;