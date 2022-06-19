import Vue from "vue";
import documentObject from "@/services/documentObject.js";
import helpers from "@/services/helpers.js";
import authHeader from "@/services/auth-header";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        items: [],
        editedItem: documentObject,
        defaultItem: documentObject,
    },
    actions: {
        NewForm({ dispatch, commit, state, rootState }) {
            const data = {
                vat: rootState.options.editedItem.vat,
                offer_note: rootState.options.editedItem.offer_note,
                reservation_note: rootState.options.editedItem.reservation_note,
                contract_note: rootState.options.editedItem.contract_note,
                document_footer: rootState.options.editedItem.document_footer,
                contactdata: rootState.options.editedItem.contactdata,

                contractBail: rootState.options.editedItem.defaultContractBail,
            };
            commit("resetForm");
            commit("setDocumentDefaults", data);
            commit("UpdateDialog", true, { root: true });
        },
        async updateItem({ dispatch, commit, state, rootState }, object) {
            // Check prices and make them float values before saving them into the Database
            await commit("setDocumentPrices");

            // Call API to update the Document
            await axios
                .patch(
                    rootState.baseApiUrl +
                        object.documentType +
                        "/" +
                        object.item.id,
                    object.item,
                    {
                        headers: authHeader(),
                    }
                )
                .then((response) => {
                    commit("updateItemInList", response.data);
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

        async downloadPDF({ dispatch, commit, state, rootState }, item) {
            await axios({
                url: rootState.baseApiUrl + "document/" + item.id,
                method: "GET",
                headers: authHeader(),
            }).then((response) => {
                console.log(response.data);
                let fileURL = response.data;
                let link = document.createElement("a");

                link.href = fileURL;
                link.target = "_blank";
                link.setAttribute("donload", "file.pdf");
                document.body.appendChild(link);

                link.click();
            });
        },
    },
    mutations: {
        setDocumentDefaults(state, data) {
            Object.keys(data).forEach((element) => {
                state.editedItem[element] = data[element];
            });
        },
        setDocumentPrices(state) {
            helpers.priceValues.forEach((element) => {
                state.editedItem[element] = helpers.getFloatValue(
                    state.editedItem[element]
                );
                console.log(element);
            });
        },
        setDates(state) {
            state.items.forEach((item) => {
                helpers.listDates.forEach((date) => {
                    item[date] = helpers.ISOToDE(item[date]);
                });
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
        setEditedItem(state, item) {
            helpers.dates.forEach((date) => {
                item[date] = helpers.ISOToDE(item[date]);
            });
            helpers.times.forEach((time) => {
                item[time] = helpers.trimTime(item[time]);
            });
            helpers.priceValues.forEach((price) => {
                item[price] = item[price]
                    ? parseFloat(item[price]).toFixed(2)
                    : 0.0;
                item[price] = helpers.writeFloatWithComma(item[price]);
            });
            state.editedItem = item;
        },
        resetForm(state) {
            state.editedItem = Object.assign({}, state.defaultItem);
        },
        pushItemToList(state, item) {
            helpers.listDates.forEach((date) => {
                item[date] = helpers.ISOToDE(item[date]);
            });
            state.items.push(item);
        },
        updateItemInList(state, data) {
            helpers.listDates.forEach((date) => {
                data[date] = helpers.ISOToDE(data[date]);
            });
            const index = state.items.findIndex((item) => {
                return item.id === data.id;
            });
            Object.assign(state.items[index], data);
        },
        deleteItemFromList(state, id) {
            const index = state.items.findIndex((item) => {
                return item.id === parseInt(id);
            });
            state.items.splice(index, 1);
        },

        setItemInDocument(state, data) {
            Object.keys(data.object).forEach((element) => {
                const elementName = data.itemIdentifier + "_" + element;
                Vue.set(state.editedItem, elementName, data.object[element]);
            });
        },
    },
};