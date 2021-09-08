import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'
import router from '@/router'

let user = JSON.parse(localStorage.getItem("user"));

if (user) {
    let decode = VueJwtDecode.decode(user.token);
    user.decode = decode;
    user.username = decode.username;
    const expire = new Date(decode.exp * 1000)
    const now = new Date()
    if (expire < now) {
        localStorage.removeItem("user");
        user = null
    }
}

const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: {} };



export default {
    state: initialState,

    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            let decode = VueJwtDecode.decode(user.token);
            user.decode = decode;
            state.user = user;
            //router.push({'path:': '/dashboard'})
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            router.push({'path': '/login'})
        },
    },

    actions: {
        userLogin({ commit, state, rootState }, user) {
            axios
                .post(rootState.baseApiUrl + "login", {
                    username: user.username,
                    password: user.password,
                })
                .then((response) => {
                    if (response.data.token) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data)
                        );
                        user.token = response.data.token;
                        delete user.password
                        commit("loginSuccess", user);
                        setTimeout(
                            () => router.push({ path: "/dashboard" }),
                            100
                        );
                    }
                })
                .catch((error) => {
                    commit("loginFailure");
                    console.log(error);
                });
        },
        userLogout({ commit }) {
            localStorage.removeItem("user");
            commit("logout");
        },
    },
};
