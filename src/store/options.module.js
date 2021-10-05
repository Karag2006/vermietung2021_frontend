export default {
    namespaced: true,
    state: {
        editedItem: {
        }
    },
    actions: {},
    mutations: {
        setEditedItem(state, data) {
            state.editedItem = data;
        },
        updateItemInList(state, data) {}
    },
};