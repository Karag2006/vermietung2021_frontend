const mutations = {
    showSnackbar(state, payload) {
        state.snackbar.text = payload.text;
        state.snackbar.color = payload.color;
        state.snackbar.show = true;
    },
    closeSnackbar(state) {
        state.snackbar.show = false;
    },
    UpdateDialog(state, value) {
        state.dialog = value
    }
}

export default mutations;