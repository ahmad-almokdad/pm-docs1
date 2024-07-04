import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Dashboard"],
  endpoints: (build) => ({
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getBanks: build.query({
      query: () => "banks",
      providesTags: ["Banks"],
    }),
    updateBank: build.mutation({
      query: (data) => ({
        url: `banks/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),
    addBank: build.mutation({
      query: (data) => ({
        url: `banks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Banks"],
    }),

    getSystemInfo: build.query({
      query: () => "system-info",
      providesTags: ["SystemInfo"],
    }),
    updateSystemInfo: build.mutation({
      query: (data) => ({
        url: `system-info/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SystemInfo"],
    }),
    addSystemInfo: build.mutation({
      query: (data) => ({
        url: `system-info`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SystemInfo"],
    }),

    getUsernameAgent: build.query({
      query: () => "username-agent",
      providesTags: ["UsernameAgent"],
    }),
    updateUsernameAgent: build.mutation({
      query: (data) => ({
        url: `username-agent/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UsernameAgent"],
    }),
    addUsernameAgent: build.mutation({
      query: (data) => ({
        url: `username-agent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UsernameAgent"],
    }),

    getAgentAccountTypes: build.query({
      query: () => "account-types",
      providesTags: ["AgentAccountTypes"],
    }),
    updateAgentAccountTypes: build.mutation({
      query: (data) => ({
        url: `account-types/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentAccountTypes"],
    }),
    addAgentAccountTypes: build.mutation({
      query: (data) => ({
        url: `account-types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgentAccountTypes"],
    }),

    getCountries: build.query({
      query: () => "countries",
      providesTags: ["Countries"],
    }),
    updateCountries: build.mutation({
      query: (data) => ({
        url: `countries/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Countries"],
    }),
    addCountries: build.mutation({
      query: (data) => ({
        url: `countries`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Countries"],
    }),
    getCurrency: build.query({
      query: () => "currency",
      providesTags: ["Currency"],
    }),
    updateCurrency: build.mutation({
      query: (data) => ({
        url: `currency/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Currency"],
    }),
    addCurrency: build.mutation({
      query: (data) => ({
        url: `currency`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Currency"],
    }),
    getMainOperation: build.query({
      query: () => "main-operation",
      providesTags: ["MainOperation"],
    }),
    updateMainOperation: build.mutation({
      query: (data) => ({
        url: `main-operation/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MainOperation"],
    }),
    addMainOperation: build.mutation({
      query: (data) => ({
        url: `main-operation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MainOperation"],
    }),
    getSubOperation: build.query({
      query: () => "sub-operation",
      providesTags: ["SubOperation"],
    }),
    updateSubOperation: build.mutation({
      query: (data) => ({
        url: `sub-operation/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SubOperation"],
    }),
    addSubOperation: build.mutation({
      query: (data) => ({
        url: `sub-operation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubOperation"],
    }),
    getAgents: build.query({
      query: () => "agents",
      providesTags: ["Agents"],
    }),
    updateAgents: build.mutation({
      query: (data) => ({
        url: `agents/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Agents"],
    }),
    addAgents: build.mutation({
      query: (data) => ({
        url: `agents`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agents"],
    }),
    getAgentClients: build.query({
      query: () => "agent-clients",
      providesTags: ["AgentClients"],
    }),
    updateAgentClients: build.mutation({
      query: (data) => ({
        url: `agent-clients/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentClients"],
    }),
    addAgentClients: build.mutation({
      query: (data) => ({
        url: `agent-clients`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgentClients"],
    }),
    getAssignClient: build.query({
      query: () => "assign-agent",
      providesTags: ["AssignClient"],
    }),
    updateAssignClient: build.mutation({
      query: (data) => ({
        url: `assign-agent/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AssignClient"],
    }),
    addAssignClient: build.mutation({
      query: (data) => ({
        url: `assign-agent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignClient"],
    }),
    getAgentOperation: build.query({
      query: () => "operation-agent",
      providesTags: ["AgentOperation"],
    }),
    deleteAgentOperation: build.mutation({
      query: (data) => ({
        url: `operation-agent/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentOperation"],
    }),
    updateAgentOperation: build.mutation({
      query: (data) => ({
        url: `operation-agent/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentOperation"],
    }),
    addAgentOperation: build.mutation({
      query: (data) => ({
        url: `operation-agent`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgentOperation"],
    }),
    getCommissions: build.query({
      query: () => "commissions",
      providesTags: ["Commissions"],
    }),
    updateCommissions: build.mutation({
      query: (data) => ({
        url: `commissions/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Commissions"],
    }),
    addCommissions: build.mutation({
      query: (data) => ({
        url: `commissions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Commissions"],
    }),
    getAgentTypes: build.query({
      query: () => "agents-types",
      providesTags: ["AgentTypes"],
    }),
    updateAgentTypes: build.mutation({
      query: (data) => ({
        url: `agents-types/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AgentTypes"],
    }),
    addAgentTypes: build.mutation({
      query: (data) => ({
        url: `agents-types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgentTypes"],
    }),
    getAllowedLg: build.query({
      query: () => "allowed-lg",
      providesTags: ["AllowedLg"],
    }),
    updateAllowedLg: build.mutation({
      query: (data) => ({
        url: `allowed-lg/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllowedLg"],
    }),
    addAllowedLg: build.mutation({
      query: (data) => ({
        url: `allowed-lg`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllowedLg"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetBanksQuery,
  useUpdateBankMutation,
  useAddBankMutation,
  useGetCountriesQuery,
  useAddCountriesMutation,
  useUpdateCountriesMutation,
  useGetCurrencyQuery,
  useAddCurrencyMutation,
  useUpdateCurrencyMutation,
  useGetMainOperationQuery,
  useAddMainOperationMutation,
  useUpdateMainOperationMutation,
  useGetSubOperationQuery,
  useAddSubOperationMutation,
  useUpdateSubOperationMutation,
  useGetAgentsQuery,
  useAddAgentsMutation,
  useUpdateAgentsMutation,
  useGetAgentClientsQuery,
  useAddAgentClientsMutation,
  useUpdateAgentClientsMutation,
  useGetAssignClientQuery,
  useAddAssignClientMutation,
  useUpdateAssignClientMutation,
  useGetAgentOperationQuery,
  useAddAgentOperationMutation,
  useDeleteAgentOperationMutation,
  useUpdateAgentOperationMutation,
  useGetCommissionsQuery,
  useAddCommissionsMutation,
  useUpdateCommissionsMutation,
  useGetAgentTypesQuery,
  useAddAgentTypesMutation,
  useUpdateAgentTypesMutation,
  useGetSystemInfoQuery,
  useAddSystemInfoMutation,
  useUpdateSystemInfoMutation,
  useGetUsernameAgentQuery,
  useAddUsernameAgentMutation,
  useUpdateUsernameAgentMutation,
  useAddAgentAccountTypesMutation,
  useGetAgentAccountTypesQuery,
  useUpdateAgentAccountTypesMutation,
  useGetAllowedLgQuery,
  useAddAllowedLgMutation,
  useUpdateAllowedLgMutation,
} = api;
