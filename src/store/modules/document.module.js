import { now } from "core-js";
import Vue from "vue";
import authHeader from "@/services/auth-header";
import axios from "axios";
import documentObject from "@/services/documentObject.js";
import helpers from "../../services/helpers";


export default {
    namespaced: true,
    state: {
        listHeaders: [
            {
                text: "ID",
                align: "start",
                sortable: true,
                value: "offerNumber",
            },
            { text: "Kunde", value: "customer_name1" },
            { text: "Anhänger", value: "vehicle_title" },
            { text: "Kennzeichen", value: "vehicle_plateNumber" },
            { text: "Abholdatum", value: "collectDate" },
            { text: "Rückgabedatum", value: "returnDate" },
            {
                text: "",
                value: "actions",
                sortable: false,
                filterable: false,
                align: "end",
            },
        ],
        items: [],
        editedItem: documentObject,
        defaultItem: documentObject,
    },
    actions: {
        async storeNewItem({ dispatch, commit, state, rootState }, object) {

            // Documents need special handling on save.

            if (state.editedItem.id) {
                return
            }
            
            if (!object.documentType) {
                return
            }
            commit("setSingleValue", {
                elementName: "currentState",
                elementValue: object.documentType,
            });

            const date = new Date().toISOString().substr(0, 10);
            state.editedItem[state.editedItem.currentState + "Date"] = helpers.isoToGermanDate(date)

            await dispatch("getHighestDocumentNumber")
            console.log(state.editedItem["offerNumber"])
            
            axios
                .post(rootState.baseApiUrl + state.editedItem.currentState, state.editedItem, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("pushItemToList", response.data);
                    commit(
                        "showSnackbar",
                        {
                            text: object.successMsg,
                            color: "success darken-3",
                        },
                        { root: true }
                    );
                })
                .catch((error) => {
                    commit(
                        "showSnackbar",
                        {
                            text: object.errorMsg,
                            color: "error darken-2",
                        },
                        { root: true }
                    );
                });
        },
        async getHighestDocumentNumber({ dispatch, commit, state, rootState }) {
            // Ask the API for the answer
            await axios
                .get(
                    rootState.baseApiUrl + state.editedItem.currentState + "/highestNumber",
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    commit("setDocumentNumber", response.data);
                });

        }
    },
    mutations: {
        setDocumentNumber(state, number) {
            state.editedItem[state.editedItem.currentState + "Number"] = number + 1
        },
        UpdateEditedItem(state, value) {
            state.editedItem = value;
        },
        setSingleValue(state, object) {
            Vue.set(state.editedItem, object.elementName, object.elementValue);
        },
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
        parseDate(state, object) {
            if (object.date) {
                const [day, month, year] = object.date.split(".");
                state[object.dateVariable] = `${year}-${month.padStart(
                    2,
                    "0"
                )}-${day.padStart(2, "0")}`;
            } else {
                state[object.dateVariable] = new Date()
                    .toISOString()
                    .substr(0, 10);
            }
        },
        formatDate(state, object) {
            if (object.date) {
                const [year, month, day] = object.date.split("-");
                state.editedItem[
                    object.dateVariable
                ] = `${day}.${month}.${year}`;
            }
        },

        setItemInDocument(state, data) {
            Object.keys(data.object).forEach((element) => {
                const elementName = data.itemIdentifier + "_" + element;
                Vue.set(state.editedItem, elementName, data.object[element]);
            });
        },
    },
};