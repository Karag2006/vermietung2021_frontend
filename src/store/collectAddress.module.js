export default {
    namespaced: true,
    state: {
        listHeaders: [
            {
                text: "Name",
                align: "start",
                sortable: true,
                value: "name",
            },
            { text: "Adresse", value: "address" },
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
    },
};