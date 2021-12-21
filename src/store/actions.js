import authHeader from "@/services/auth-header";
import axios from "axios";

const actions = {
    storeNewItem({ dispatch, commit, state, rootState }, object) {
        if (object.module == "document/") {
            dispatch(object.module + "storeNewItem", object);
        }
        else {
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
        }
    },
    async getItemsList({ commit, state, rootState }, object) {
        axios
            .get(rootState.baseApiUrl + object.type, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.moduleName + "setItemsList", response.data);
                if (object.moduleName == "document/") {
                    commit(object.moduleName + "setDates");
                } 
            });
    },

    updateItem({dispatch, commit, state, rootState }, object) {
        if (object.module == "document/") {
            dispatch(object.module + "updateItem", object);
        }
        else {
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
        }
    },
    getItemById({ commit, state, rootState }, object) {
        axios
            .get(rootState.baseApiUrl + object.type + object.itemId, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.moduleName + "setEditedItem", response.data);
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
                    "document/setItemInDocument",
                    {
                        itemIdentifier: object.itemIdentifier,
                        object: response.data
                    }
                );
            });
    },
    deleteItemById({ commit, state, rootState }, object) {
        axios
            .delete(rootState.baseApiUrl + object.type + object.id, {
                headers: authHeader(),
            })
            .then((response) => {
                commit(object.moduleName + "deleteItemFromList", response.data);
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
