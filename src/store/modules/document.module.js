import { now } from "core-js";
import Vue from "vue";
import documentObject from "@/services/documentObject.js";


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
        storeNewItem({ commit, state, rootState }, object) {
            // Documents need special handling on save.

            // This action should not be called if this document already existed before
            // check for an id beeing set and return error its there.
            
            // Check what Type of Document needs to be stored

                // Add current Date as Date for the Document Type
            
                // Get the highest Document Type Number so far and add 1
            
            // Call API to store the Document

            // Use the returned Object from the API to add this item directly to the Itemlist.
        },
    },
    mutations: {
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