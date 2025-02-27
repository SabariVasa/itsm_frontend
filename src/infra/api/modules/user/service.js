import axios from "axios";

class UserService {
    login(userObj) {
        return new Promise((resolve, reject) => {
            axios
                .post('/auth_service/login_user', userObj)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    setBearerToken(token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
}

export const userService = new UserService();