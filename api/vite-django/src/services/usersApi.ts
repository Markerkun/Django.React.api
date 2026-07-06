
import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/CreateBaseQuery.ts";
import type {IUserItem} from "../types/users/IUserItem.ts";
import type {IUserResponse} from "../types/users/IUserResponse.ts";
import type {IUserRegistration} from "../types/users/IUserRegistration.ts";
import type {IUserLogin} from "../types/users/IUserLogin.ts";

export const usersApi = createApi({
    baseQuery: createBaseQuery('users'),
    tagTypes: ['users'],
    reducerPath: "usersApi",
    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '/',
                    method: 'GET'
                }
            }
        }),
        registrationUser: builder.mutation<IUserResponse, IUserRegistration>({
            query: (userData) => {
                return {
                    url: '/registration/',
                    method: 'POST',
                    body: userData
                }
            }
        }),
        loginUser: builder.mutation<IUserResponse, IUserLogin>({
            query: (userData) => {
                return {
                    url: '/login/',
                    method: 'POST',
                    body: userData
                }
            }
        })

    })
});

export const {
    useGetUsersQuery,
    useRegistrationUserMutation,
    useLoginUserMutation
} = usersApi;
