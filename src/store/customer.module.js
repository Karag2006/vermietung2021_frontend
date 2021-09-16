import authHeader from "@/services/auth-header";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        date: "",
        listHeaders: [
            {
                text: "Name 1",
                align: "start",
                sortable: true,
                value: "name1",
            },
            { text: "Name 2", value: "name2" },
            { text: "PLZ", value: "plz" },
            { text: "Ort", value: "city" },
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
            pass_number: "",
            name1: "",
            name2: "",
            street: "",
            plz: "",
            city: "",
            birth_date: "",
            birth_city: "",
            phone: "",
            car_number: "",
            email: "",
            driving_license_no: "",
            driving_license_class: "",
        },
        // default item can be read only
        defaultItem: {
            pass_number: "",
            name1: "",
            name2: "",
            street: "",
            plz: "",
            city: "",
            birth_date: "",
            birth_city: "",
            phone: "",
            car_number: "",
            email: "",
            driving_license_no: "",
            driving_license_class: "",
        },
    },
    actions: {
        storeNewItem({ commit, state, rootState }, item) {
            axios
                .post(rootState.baseApiUrl + "customer", item, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("pushItemToList", response.data);
                });
        },
        getItemsList({ commit, state, rootState }) {
            axios
                .get(rootState.baseApiUrl + "customer", {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("setItemsList", response.data);
                });
        },
        getItemById({ commit, state, rootState }, id) {
            axios
                .get(rootState.baseApiUrl + "customer/" + id, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("setEditedItem", response.data);
                    commit("parseDate", response.data.birth_date);
                });
        },

        updateItem({ commit, state, rootState }, data) {
            axios
                .patch(rootState.baseApiUrl + "customer/" + data.id, data, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("updateItemInList", response.data);
                });
        },

        deleteItemById({ commit, state, rootState }, id) {
            axios
                .delete(rootState.baseApiUrl + "customer/" + id, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("deleteItemFromList", response.data);
                });
        },
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
        parseDate(state, date) {
            if (date) {
                 const [day, month, year] = date.split(".");
                 state.date = `${year}-${month.padStart(2, "0")}-${day.padStart(
                     2,
                     "0"
                 )}`;
            }
           
        },
        formatDate(state, date) {
            if (date) {
                const [year, month, day] = date.split("-");
                state.editedItem.birth_date = `${day}.${month}.${year}`;
            }
            
        }
    },
};