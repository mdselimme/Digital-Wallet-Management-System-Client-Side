import { baseApi } from "@/redux/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        
        // user register 
        superAdminTransferOther: builder.mutation({
            query:(payload)=>({
                url: "/transaction/add-money",
                method:"POST",
                data:payload
            })
        }),
        // agent cash in user
        agentCashInUser: builder.mutation({
            query:(payload)=>({
                url: "/transaction/cash-in",
                method:"POST",
                data:payload
            })
        }),
        // agent b2b transaction
        agentB2BAgent: builder.mutation({
            query:(payload)=>({
                url: "/transaction/b-to-b",
                method:"POST",
                data:payload
            })
        }),
        // send money user to user 
        userSendMoneyUser: builder.mutation({
            query:(payload)=>({
                url: "/transaction/send-money",
                method:"POST",
                data:payload
            })
        }),
        //cash out user form agent
        userCashOutAgent: builder.mutation({
            query:(payload)=>({
                url: "/transaction/cash-out",
                method:"POST",
                data:payload
            })
        }),
        //get me user
        getMyTransaction: builder.query({
            query: (params) => ({
                url: "/transaction/get/me",
                method:"GET",
                params
            })
        }),
        //get single transaction
        getSingleTransaction: builder.query({
            query: (id) => ({
                url: `transaction/${id}`,
                method:"GET",
            })
        }),
        //get all transaction
        getAllTransaction: builder.query({
            query: (params) => ({
                url: "/transaction",
                method:"GET",
                params
            })
        })

    })
});

export const {
    useSuperAdminTransferOtherMutation,
    useGetMyTransactionQuery
}  = authApi;