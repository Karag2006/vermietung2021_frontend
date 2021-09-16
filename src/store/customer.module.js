import authHeader from "@/services/auth-header";
import axios from "axios";


export default {
    namespaced: true,
    state: {
        listHeaders: [
            {
                text: "Name 1",
                align: "start",
                sortable: true,
                value: "name1",
            },
            { text: "Name 2", value: "name2" },
            { text: "PLZ", value: "plz" },
            { text: "Ort", value: "city" },
            {
                text: "",
                value: "actions",
                sortable: false,
                align: "end",
            },
        ],
        items: [],
        editedItem: {
            pass_number: "",
            name1: "",
            name2: "",
            street: "",
            plz: "",
            city: "",
            birth_date: "",
            birth_city: "",
            phone: "",
            car_number: "",
            email: "",
            driving_license_no: "",
            driving_license_class: "",
        },
        // default item can be read only
        defaultItem: {
            pass_number: "",
            name1: "",
            name2: "",
            street: "",
            plz: "",
            city: "",
            birth_date: "",
            birth_city: "",
            phone: "",
            car_number: "",
            email: "",
            driving_license_no: "",
            driving_license_class: "",
        },
        form: [
            {
                fieldname: "pass_number",
                label: "Personalausweis Nr.",
                type: "text",
            },
            { fieldname: "name1", label: "Name / Firma", type: "text" },
            { fieldname: "name2", label: "Name 2", type: "text" },
            { fieldname: "street", label: "Strasse", type: "text" },
            { fieldname: "plz", label: "Postleitzahl", type: "text" },
            { fieldname: "city", label: "Ort", type: "text" },
            { fieldname: "birth_date", label: "Geburtsdatum", type: "date" },
            { fieldname: "birth_city", label: "Geburtsort", type: "text" },
            { fieldname: "phone", label: "Telefonnummer", type: "text" },
            {
                fieldname: "car_number",
                label: "Kennzeichen vom Zugfahrzeug",
                type: "text",
            },
            { fieldname: "email", label: "E-Mail Adresse", type: "text" },
            {
                fieldname: "driving_license_no",
                label: "Führerschein Nr.",
                type: "text",
            },
            {
                fieldname: "driving_license_class",
                label: "Führerschein Klasse",
                type: "text",
            },
        ],
    },
    actions: {
        getItemsList({ commit, state, rootState }) {
            axios
                .get(rootState.baseApiUrl + "customer", {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("setItemsList", response.data);
                });
        },
        getItemById({ commit, state, rootState }, id) {
            axios
                .get(rootState.baseApiUrl + "customer/" + id, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("setEditedItem", response.data);
                });
        },
        storeNewItem({ commit, state, rootState }, item) {
            axios
                .post(rootState.baseApiUrl + "customer", item, {
                    headers: authHeader(),
                })
                .then((response) => {
                    commit("pushItemToList", response.data);
                });
        },
    },
    mutations: {
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
            state.items.push(data)
        },
    },
};