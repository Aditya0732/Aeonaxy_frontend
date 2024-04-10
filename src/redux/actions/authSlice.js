import { createSlice } from '@reduxjs/toolkit';

const initializeStateFromLocalStorage = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const storedUser = localStorage.getItem('user');

    return {
        accessToken: storedAccessToken || null,
        refreshToken: storedRefreshToken || null,
        user: storedUser ? JSON.parse(storedUser) : null,
    };
};

const initialState = initializeStateFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        updateUserDetails: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
        },
    },
});

export const { setAccessToken, setRefreshToken, setUser, updateUserDetails } = authSlice.actions;

export default authSlice.reducer;
