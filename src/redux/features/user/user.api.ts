import { baseApi } from "@/redux/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        // user register 
        userRegister: builder.mutation({
            query:(payload)=>({
                url: "/user/register",
                method:"POST",
                data:payload
            })
        }),
        // user update 
        userUpdate: builder.mutation({
            query:({id,payload})=>({
                url: `/user/update/${id}`,
                method:"PATCH",
                data:payload
            })
        }),
        // user update role
        userUpdateRole: builder.mutation({
            query:({email,payload})=>({
                url: `/user/role?email=${email}`,
                method:"PATCH",
                data:payload
            })
        }),
        // user update status
        userUpdateStatus: builder.mutation({
            query:({email,payload})=>({
                url: `/user/status?email=${email}`,
                method:"PATCH",
                data:payload
            })
        }),
        // user update status
        userUpdateActivity: builder.mutation({
            query:({email,payload})=>({
                url: `/user/activity?email=${email}`,
                method:"PATCH",
                data:payload
            })
        }),
        //get me user
        userGetMe: builder.query({
            query: () => ({
                url: "/user/me"
            })
        }),
        //get all users
        userGetAll: builder.query({
            query: (params) => ({
                url: "/user",
                method: "GET",
                params
            })
        }),
        //get single user
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/user/${id}`
            })
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
}  = userApi;