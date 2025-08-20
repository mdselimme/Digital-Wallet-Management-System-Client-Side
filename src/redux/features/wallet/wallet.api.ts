import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        // user register 
        addMoneyToSuper: builder.mutation({
            query:(payload)=>({
                url: "/wallet/add/super",
                method:"PATCH",
                data:payload
            })
        }),
        //get me user
        getMyWallet: builder.query({
            query: () => ({
                url: "/wallet/me"
            })
        }),
        //get a single wallet
        getSingleWallet: builder.query({
            query: (id) => ({
                url: `/wallet/${id}`
            })
        }),
        //get all wallet
        getAllWallet: builder.query({
            query: (params) => ({
                url: "/wallet",
                method:"GET",
                params
            })
        })
    })
});

export const {
    useAddMoneyToSuperMutation,
    useGetSingleWalletQuery,
    useGetAllWalletQuery,
    useGetMyWalletQuery
}  = authApi;