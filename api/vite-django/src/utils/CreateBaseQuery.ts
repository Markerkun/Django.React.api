import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import APP_ENV from "../env"; // шлях підлаштуйте під свій проєкт

export const createBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.API_URL}/api/${endpoint}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    });
};