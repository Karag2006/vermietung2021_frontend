import Vue from 'vue'
import Vuex from 'vuex'
import navigation from './navigation'
import auth from './auth.module.js'
import customer from './customer.module'
import user from './user.module'
import authHeader from "@/services/auth-header";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        snackbar: {
            show: false,
            text: "",
            color: "",
        },
        baseApiUrl: "http://192.168.1.21/api/",
    },
    mutations: {
        showSnackbar(state, payload) {
            state.snackbar.text = payload.text;
            state.snackbar.color = payload.color;
            state.snackbar.show = true;
        },
        closeSnackbar(state) {
            state.snackbar.show = false;
        },
    },
    actions: {
        storeNewItem({ commit, state, rootState }, object) {
            axios
                .post(rootState.baseApiUrl + object.module, object.item, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit(object.module + "pushItemToList", response.data);
                    commit(
                        "showSnackbar",
                        {
                            text: object.successMsg,
                            color: "success darken-3",
                        }
                    );
                })
                .catch((error) => {
                    commit(
                        "showSnackbar",
                        {
                            text: object.errorMsg,
                            color: "error darken-2",
                        }
                    );
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
    },
    modules: {
        auth,
        navigation,
        customer,
        user,
    },
});
