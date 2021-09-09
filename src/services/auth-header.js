import store from "@/store/index.js";

export default function authHeader() {
    let user = store.state.auth.user;

    const expire = new Date(user.decode.exp * 1000);
    const now = new Date();

    if (expire < now) {
        user = null;
        store.dispatch('userLogout')
    }

    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}
