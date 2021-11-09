import { now } from "core-js";
import Vue from "vue";


export default {
    namespaced: true,
    state: {
        collectDate: "",
        collectTime: "",
        returnDate: "",
        returnTime: "",
        reservationDepositDate: "",
        finalPaymentDate: "",
        contractBailDate: "",
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
        editedItem: {},
        defaultItem: {},
    },
    actions: {},
    mutations: {
        setSingleValue(state, object) {
            console.log(object)
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