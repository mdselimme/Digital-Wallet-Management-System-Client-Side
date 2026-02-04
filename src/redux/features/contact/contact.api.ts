import { baseApi } from "@/redux/baseApi";


export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //user login
        contactEmail: builder.mutation({
            query: (payload) => ({
                url: "/contact/send",
                method: "POST",
                data: payload
            })
        }),
    })
});

export const {
    useContactEmailMutation
} = contactApi;