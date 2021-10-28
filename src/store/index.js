import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import navigation from './modules/navigation'
import auth from './modules/auth.module.js'
import customer from './modules/customer.module'
import user from './modules/user.module'
import trailer from './modules/trailer.module'
import equipment from "./modules/equipment.module";
import options from './modules/options.module'
import collectAddress from './modules/collectAddress.module'
import document from './modules/document.module'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        snackbar: {
            show: false,
            text: "",
            color: "",
        },
        baseApiUrl: "http://10.40.28.22/api/",
        // TODO: change from hard coded API URL to using .env
    },
    mutations,
    actions,
    getters,
    modules: {
        auth,
        navigation,
        customer,
        user,
        trailer,
        equipment,
        options,
        collectAddress,
        document,
    },
});
