import authHeader from "@/services/auth-header";
import axios from "axios";

const actions = {
    storeNewItem({ commit, state, rootState }, object) {
        axios
            .post(rootState.baseApiUrl + object.module, object.item, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.module + "pushItemToList", response.data);
                commit("showSnackbar", {
                    text: object.successMsg,
                    color: "success darken-3",
                });
            })
            .catch((error) => {
                commit("showSnackbar", {
                    text: object.errorMsg,
                    color: "error darken-2",
                });
            });
    },
    getItemsList({ commit, state, rootState }, moduleName) {
        axios
            .get(rootState.baseApiUrl + moduleName, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(moduleName + "setItemsList", response.data);
            });
    },

    updateItem({ commit, state, rootState }, object) {
        axios
            .patch(
                rootState.baseApiUrl + object.module + object.item.id,
                object.item,
                {
                    headers: authHeader(),
                }
            )
            .then((response) => {
                commit(object.module + "updateItemInList", response.data);
                commit("showSnackbar", {
                    text: object.successMsg,
                    color: "success darken-3",
                });
            })
            .catch((error) => {
                commit("showSnackbar", {
                    text: object.errorMsg,
                    color: "error darken-2",
                });
            });
    },
    getItemById({ commit, state, rootState }, object) {
        axios
            .get(rootState.baseApiUrl + object.module + object.itemId, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.module + "setEditedItem", response.data);
            });
    },
    getDocumentValues({ commit, state, rootState }, object) {
        axios
            .get(rootState.baseApiUrl + object.module + object.itemId, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.module + "setEditedItem", response.data);
                commit(
                    "document/setTrailerInDocument",
                    response.data
                );
            });
    },
    deleteItemById({ commit, state, rootState }, object) {
        axios
            .delete(rootState.baseApiUrl + object.module + object.id, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.module + "deleteItemFromList", response.data);
                commit("showSnackbar", {
                    text: object.successMsg,
                    color: "success darken-3",
                });
            })
            .catch((error) => {
                commit("showSnackbar", {
                    text: object.errorMsg,
                    color: "error darken-2",
                });
            });
    },
};

export default actions;
