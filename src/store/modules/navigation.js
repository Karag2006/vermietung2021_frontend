import authHeader from '@/services/auth-header'
import axios from 'axios';

export default {
    state: {
        drawer: null,
        navMenu: [],
    },
    mutations: {
        toggleNavDrawer(state) {
            state.drawer = !state.drawer;
        },
        setNavMenu(state, data) {
            Object.keys(data).forEach(element => {
                state.navMenu.push(data[element]);
            })
        },
        clearNavMenu(state) {
            state.navMenu = []
        }
    },
    actions: {
        getNavMenu({ commit, state, rootState }) {
            axios
                .get(rootState.baseApiUrl + "nav", { 
                    headers: authHeader()
                })
                .then((response) => {
                    commit('setNavMenu', response.data)
                });
        }
    },
};
