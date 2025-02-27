import { createSlice } from '@reduxjs/toolkit';
import {
    loginWithGoogle,
    signInWithEmailAndPassword,
} from './thunks';

const initialState = {
    user: null,
    fetchingUser: false,
    errorMesg: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload;
        },
        authReset: () => {
            return {
                ...initialState,
            };
        },
        updateInfo: (_, action) => {
            return {
                ...initialState,
                ...action.payload,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithGoogle.pending, (state) => {
            state.fetchingUser = true;
        });

        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.fetchingUser = false;
            state.user = action.payload;
        });

        builder.addCase(loginWithGoogle.rejected, (state) => {
            state.fetchingUser = false;
            state.user = null;
        });

        builder.addCase(signInWithEmailAndPassword.pending, (state) => {
            state.fetchingUser = true;
        });

        builder.addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
            state.fetchingUser = false;
            state.user = action.payload.user_obj;
            state.errorMesg = action.payload.errorMesg;
        });

        builder.addCase(signInWithEmailAndPassword.rejected, (state) => {
            state.fetchingUser = false;
            state.user = null;
        });
    },
});

export const { setUserInfo, authReset, updateInfo } = authSlice.actions;

export default authSlice.reducer;
