<template>
    <v-card class="card mx-4 mt-10" elevation="3">
        <v-card-text>
            <v-data-table :headers="headers" :items="items" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <h4 class="component-title mb-4">
                                Kundenliste
                            </h4>
                            <div>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                    clearable
                                ></v-text-field>
                            </div>
                        </v-toolbar-title>

                        <v-spacer></v-spacer>
                        <CustomerDialog 
                            :trigger="dialog"
                            :editedIndex="editedIndex" 
                            v-on:close="dialog = false"
                            v-on:resetIndex="editedIndex = -1"   
                        />
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5"
                                    >Kunden wirklich löschen? <br />
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
        "CustomerDialog": require("@/components/forms/CustomerDialog.vue").default,
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        search: "",
    }),

    computed: {
        ...mapState("customer", {
            items: (state) => state.items,
            headers: (state) => state.listHeaders,
            editedItem: (state) => state.editedItem,
            defaultItem: (state) => state.defaultItem,
            date: (state) => state.date,
        }),
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getItemsList();
    },

    methods: {
        ...mapActions("customer", [
            "getItemsList",
            "getItemById",
            "storeNewItem",
            "deleteItemById",
            "updateItem",
        ]),

        ...mapMutations("customer", ["resetForm", "parseDate", "formatDate"]),

        editItem(item) {
            this.editedIndex = item.id;
            this.getItemById(this.editedIndex);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = item.id;

            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.deleteItemById(this.editedIndex);
            this.closeDelete();
        },

        close() {
            // reset Dialog
            this.dialog = false;
            this.$nextTick(() => {
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            // reset Delete Dialog
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                this.updateItem(this.editedItem);
            } else {
                this.storeNewItem(this.editedItem);
            }
            this.close();
        },
        datePickerInput(date) {
            this.datePicker = false;
            this.formatDate(date);
            this.parseDate(this.editedItem.birth_date);
        },
    },
};
</script>

<style>
tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
