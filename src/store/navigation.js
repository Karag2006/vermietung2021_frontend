export default {
    state: {
        drawer: null,
    },
    mutations: {
        toggleNavDrawer(state) {
            state.drawer = !state.drawer;
        },
    },
    actions: {},
};
