import authHeader from "@/services/auth-header";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        passwordChangeItem: {
            oldPassword: "",
            newPassword: "",
            newPassword_confirmation: "",
        },
        passwordChangeItemDefault: {
            oldPassword: "",
            newPassword: "",
            newPassword_confirmation: "",
        },
        passwordChange: false,
    },
    mutations: {
        openChangePw(state) {
            state.passwordChangeItem = Object.assign(
                {},
                state.passwordChangeItemDefault
            );
            state.passwordChange = true;
        },
        closeChangePw(state) {
            state.passwordChange = false;
            state.passwordChangeItem = Object.assign(
                {},
                state.passwordChangeItemDefault
            );
        },
    },
    actions: {
        changePassword({ commit, state, rootState }, payload) {
            axios
                .patch(rootState.baseApiUrl + "pwChange", payload, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("closeChangePw");
                    commit(
                        "showSnackbar",
                        {
                            text: "Passwort geändert!",
                            color: "success darken-3",
                        },
                        { root: true }
                    );
                })
                .catch((error) => {
                    commit(
                        "showSnackbar",
                        {
                            text: "Fehler beim Passwort ändern!",
                            color: "error darken-3",
                        },
                        { root: true }
                    );
                });
        },
    },
};