import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user register
    superAdminTransferOther: builder.mutation({
      query: (payload) => ({
        url: "/transaction/add-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["transaction", "user"],
    }),
    // agent cash in user
    agentCashInUser: builder.mutation({
      query: (payload) => ({
        url: "/transaction/cash-in",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["transaction", "user"],
    }),
    // agent b2b transaction
    agentB2BAgent: builder.mutation({
      query: (payload) => ({
        url: "/transaction/b-to-b",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["transaction", "user"],
    }),
    // send money user to user
    userSendMoneyUser: builder.mutation({
      query: (payload) => ({
        url: "/transaction/send-money",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["transaction", "user"],
    }),
    //cash out user form agent
    userCashOutAgent: builder.mutation({
      query: (payload) => ({
        url: "/transaction/cash-out",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["transaction", "user"],
    }),
    //get me user
    getMyTransaction: builder.query({
      query: (params) => ({
        url: "/transaction/get/me",
        method: "GET",
        params,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["transaction", "user"],
    }),
    //get single transaction
    getSingleTransaction: builder.query({
      query: (data) => ({
        url: `transaction/${data?.id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
    }),
    //get all transaction
    getAllTransaction: builder.query({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params,
      }),
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useSuperAdminTransferOtherMutation,
  useGetMyTransactionQuery,
  useGetAllTransactionQuery,
  useAgentCashInUserMutation,
  useUserSendMoneyUserMutation,
  useUserCashOutAgentMutation,
  useAgentB2BAgentMutation,
  useGetSingleTransactionQuery
} = authApi;
