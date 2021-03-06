import authHeader from "@/services/auth-header";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        listHeaders: [
            {
                text: "Benutzername",
                align: "start",
                sortable: true,
                value: "username",
            },
            { text: "Name", value: "name" },
            { text: "E-Mail Addresse", value: "email" },
            {
                text: "",
                value: "actions",
                sortable: false,
                filterable: false,
                align: "end",
            },
        ],
        items: [],
        editedItem: {
            username: "",
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        // default item can be read only
        defaultItem: {
            username: "",
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
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
        setItemsList(state, data) {
            state.items = data;
        },
        setEditedItem(state, data) {
            state.editedItem = data;
        },
        resetForm(state) {
            state.editedItem = Object.assign({}, state.defaultItem);
            state.date = "";
        },
        pushItemToList(state, data) {
            state.items.push(data);
        },
        updateItemInList(state, data) {
            const index = state.items.findIndex((item) => {
                return item.id === data.id;
            });
            Object.assign(state.items[index], data);
        },
        deleteItemFromList(state, id) {
            const index = state.items.findIndex((item) => {
                return item.id === id;
            });
            state.items.splice(index, 1);
        },
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
                            text: "Passwort ge??ndert!",
                            color: "success darken-3",
                        },
                        { root: true }
                    );
                })
                .catch((error) => {
                    commit(
                        "showSnackbar",
                        {
                            text: "Fehler beim Passwort ??ndern!",
                            color: "error darken-3",
                        },
                        { root: true }
                    );
                });
        },
    },
};