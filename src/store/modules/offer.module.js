import { now } from "core-js";


export default {
    namespaced: true,
    state: {
        date: "",
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
        parseDate(state, date) {
            if (date) {
                const [day, month, year] = date.split(".");
                state.date = `${year}-${month.padStart(2, "0")}-${day.padStart(
                    2,
                    "0"
                )}`;
            } else {
                state.date = new Date().toISOString().substr(0, 10);
            }
        },
        formatDate(state, date) {
            if (date) {
                const [year, month, day] = date.split("-");
                state.editedItem.tuev = `${day}.${month}.${year}`;
            }
        },
        setTrailerInDocument(state, data) {
            Object.keys(data).forEach(element => {
                state.editedItem["vehicle_" + element] = data[element];
            });   
        },
    },
};