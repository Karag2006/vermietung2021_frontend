<template>
    <v-card class="card mx-4 mt-10" elevation="3">
        <v-card-text>
            <v-data-table :headers="headers" :items="items" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <h4 class="component-title mb-4">
                                Reservierungen
                            </h4>
                            <div>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Suchen"
                                    single-line
                                    hide-details
                                    clearable
                                ></v-text-field>
                            </div>
                        </v-toolbar-title>

                        <v-spacer></v-spacer>
                                <v-btn
                                    class="pa-5"
                                    color="success"
                                    dark
                                    elevation="2"
                                    @click="newForm"
                                >
                                    <v-icon dark class="mr-2">
                                        fas fa-plus
                                    </v-icon>
                                    Neue Reservierung
                                </v-btn>
                        <v-dialog v-model="dialog" max-width="1200px">
                            <!-- <template v-slot:activator="{ on, attrs }">
                            </template> -->
                            <ReservationForm
                                :trigger="dialog"
                                :editedIndex="editedIndex"
                                v-on:close="dialog = false"
                                v-on:resetIndex="editedIndex = -1"
                            />
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5"
                                    >Angebot wirklich löschen? <br />
                                    <h6>
                                        Dies kann nicht rückgängig gemacht
                                        werden
                                    </h6></v-card-title
                                >
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="closeDelete"
                                        >Abbrechen</v-btn
                                    >
                                    <v-btn
                                        color="red darken-1"
                                        text
                                        @click="deleteItemConfirm"
                                        >Löschen</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        color="red"
                        small
                        class="mr-4"
                        @click="downloadPDF(item)"
                    >
                        far fa-file-pdf
                    </v-icon>
                    <v-icon
                        color="success"
                        small
                        class="mr-4"
                        @click="editItem(item)"
                    >
                        far fa-edit
                    </v-icon>
                    <v-icon
                        color="red darken-2"
                        small
                        @click="deleteItem(item)"
                    >
                        fas fa-trash-alt
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
    components: {
        ReservationForm: require("@/components/forms/ReservationForm.vue")
            .default,
    },
    data: () => ({
        headers: [
            {
                text: "Nummer",
                align: "start",
                sortable: true,
                value: "reservationNumber",
            },
            { text: "Kunde", value: "customer_name1" },
            { text: "Anhänger", value: "vehicle_title" },
            { text: "Kennzeichen", value: "vehicle_plateNumber" },
            { text: "Abholdatum", value: "collectDate" },
            { text: "Rückgabedatum", value: "returnDate" },
            {
                text: "Aktionen",
                value: "actions",
                sortable: false,
                filterable: false,
                align: "end",
            },
        ],
        dialogDelete: false,
        editedIndex: -1,
        search: "",
    }),

    computed: {
        ...mapState("document", {
            items: (state) => state.items,
            
            editedItem: (state) => state.editedItem,
            defaultItem: (state) => state.defaultItem,
            date: (state) => state.date,
        }),
        
        dialog: {
            get() {
                return this.$store.state.dialog
            },
            set (value) {
                this.$store.commit('UpdateDialog', value)
            }
        },
        
    },

    watch: {
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    methods: {
        ...mapActions(["getItemsList", "getItemById", "deleteItemById"]),
        ...mapActions("document/", ["downloadPDF"]),
        async newForm(){
            await this.$store.dispatch("document/NewForm")
        },
        editItem(item) {
            this.editedIndex = item.id;
            this.getItemById({
                itemId: this.editedIndex,
                moduleName: "document/",
                type: "reservation/",
            });
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = item.id;
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.deleteItemById({
                id: this.editedIndex,
                moduleName: "document/",
                type:"reservation/",
                successMsg: "Reservierung erfolgreich gelöscht!",
                errorMsg: "Fehler beim Löschen des Reservierung",
            });
            this.closeDelete();
        },
        closeDelete() {
            // reset Delete Dialog
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedIndex = -1;
            });
        },
        
    },

    created() {
        this.getItemsList({moduleName:"document/", type:"reservation/"});
        this.getItemById({itemId: 1, moduleName: "options/",type: "options/",});
    },
};
</script>

<style>
tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
