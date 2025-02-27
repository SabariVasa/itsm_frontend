import { signInWithEmailAndPassword } from '../thunks';
import { parseJwt } from '../../../../global/utils';
import { authReset, updateInfo } from '../slice';
import { useAppDispatch, useAppSelector } from '../../../shared';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, fetchingUser, errorMesg } = useAppSelector((state) => state.auth);

    const _logout = () => {
        dispatch(authReset());
    };
    const _update = (updateObj) => {
        dispatch(updateInfo(updateObj));
    }

    const _signin = (user_cred) => {
        dispatch(signInWithEmailAndPassword(user_cred));
    }

    return {
        user_auth: typeof user === 'string' ? parseJwt(user) : null,
        logout: _logout,
        signin: _signin,
        loading: fetchingUser,
        error: errorMesg,
        update: _update,
    };
};
