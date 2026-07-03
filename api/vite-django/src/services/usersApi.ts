import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/CreateBaseQuery.ts";
import type {IUserItem} from "../types/users/IUserItem.ts";

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
    })
});

export const {
    useGetUsersQuery
} = usersApi;