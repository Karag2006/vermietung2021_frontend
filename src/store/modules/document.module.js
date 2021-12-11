import Vue from "vue";
import documentObject from "@/services/documentObject.js";
import helpers from "@/services/helpers.js";
import authHeader from "@/services/auth-header";
import axios from "axios";


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

            // Add current Date as creation date for the Document Type
            const currentDate = new Date().toISOString().substr(0, 10);
            const currentDateDE = helpers.ISOToDE(currentDate);
            state.editedItem[object.documentType + "Date"] = currentDateDE;

            // Get the highest Document Type Number so far and add 1
            await dispatch("getNextDocumentNumber", object.documentType);
            
            // Check prices and make them float values before saving them into the Database
            await commit("setDocumentPrices");

            // set the transmitted documentType as the Documents currentState
            state.editedItem.currentState = object.documentType;

            console.log(state.editedItem);

            // Call API to store the Document
            axios
                .post(
                    rootState.baseApiUrl + object.documentType,
                    state.editedItem,
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    // Use the returned Object from the API to add this item directly to the Itemlist.
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
        async getNextDocumentNumber(
            { dispatch, commit, state, rootState },
            type
        ) {
            await axios
                .get(rootState.baseApiUrl + type + "/highestNumber", {
                    headers: authHeader(),
                })
                .then((response) => {
                    // console.log(response.data)
                    commit("setDocumentNumber", {
                        value: response.data,
                        type: type,
                    });
                });
        },
    },
    mutations: {
        setDocumentPrices(state) {
            helpers.priceValues.forEach(element => {
                state.editedItem[element] = helpers.getFloatValue(state.editedItem[element])
            });
        },
        setDocumentNumber(state, object) {
            state.editedItem[object.type + "Number"] = object.value + 1;
        },
        UpdateEditedItem(state, value) {
            state.editedItem = value;
        },
        setSingleValue(state, object) {
            console.log(object);
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