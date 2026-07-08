// src/store/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    username: localStorage.getItem('username'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ access: string; refresh: string; username: string }>
        ) => {
            const { access, refresh, username } = action.payload;
            state.accessToken = access;
            state.refreshToken = refresh;
            state.username = username;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('username', username);
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.username = null;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;