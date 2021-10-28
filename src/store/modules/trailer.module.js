import { now } from "core-js";


export default {
    namespaced: true,
    state: {
        date: "",
        listHeaders: [
            {
                text: "Anhänger",
                align: "start",
                sortable: true,
                value: "title",
            },
            { text: "Kennzeichen", value: "plateNumber" },
            { text: "zul. GG.", value: "totalWeight" },
            { text: "Lademaße", value: "loadingSize" },
            { text: "Tüv", value: "tuev" },
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
            title: "",
            plateNumber: "",
            totalWeight: "",
            loadingSize: "",
            tuev: "",
            chassisNumber: "",
            usableWeight: "",
        },
        // default item can be read only
        defaultItem: {
            title: "",
            plateNumber: "",
            totalWeight: "",
            loadingSize: "",
            tuev: "",
            chassisNumber: "",
            usableWeight: "",
        },
    },
    actions: {},
    mutations: {
        setItemsList(state, data) {
            data.forEach(element => {
                element.selector = element.plateNumber + " - " + element.title
            });
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
    },
};