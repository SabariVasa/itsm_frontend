import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_ACTIONS } from './actions';
import { userService } from '../../../infra/api/modules/user/service';

export const loginWithGoogle = createAsyncThunk(AUTH_ACTIONS.LOGIN_GOOGLE_USER, async () => {
    //   const user = await signInWithGoogle();
    //   userService.setBearerToken(user.accessToken);
    //   return user;
});

export const logout = createAsyncThunk(AUTH_ACTIONS.LOGOUT_USER, async () => {
    // return null;
});

export const signInWithEmailAndPassword = createAsyncThunk(AUTH_ACTIONS.LOGIN_EMAIL_PASSWORD, async (userObj) => {
    const user = await userService.login(userObj);
    if (!user.valid) {
        return {
            errorMesg: user.emessage,
        }
    }
    userService.setBearerToken(user.data);
    return {
        user_obj: user.data,
    }
})
