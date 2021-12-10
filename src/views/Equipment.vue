<template>
    <v-card class="card mx-4 mt-10" elevation="3">
        <v-card-text>
            <v-data-table :headers="headers" :items="items" :search="search">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>
                            <h4 class="component-title mb-4">
                                Zubehörliste
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
                        <v-dialog v-model="dialog" max-width="1200px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="pa-5"
                                    color="success"
                                    dark
                                    elevation="2"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="resetForm"
                                >
                                    <v-icon dark class="mr-2">
                                        fas fa-plus
                                    </v-icon>
                                    Zubehör hinzufügen
                                </v-btn>
                            </template>
                            <EquipmentForm
                                :trigger="dialog"
                                :editedIndex="editedIndex"
                                v-on:close="dialog = false"
                                v-on:resetIndex="editedIndex = -1"
                            />
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5"
                                    >Zubehör wirklich löschen? <br />
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
        EquipmentForm: require("@/components/forms/EquipmentForm.vue")
            .default,
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        search: "",
    }),

    computed: {
        ...mapState("equipment", {
            items: (state) => state.items,
            headers: (state) => state.listHeaders,
            editedItem: (state) => state.editedItem,
            defaultItem: (state) => state.defaultItem,
            date: (state) => state.date,
        }),
        
    },

    watch: {
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.getItemsList({moduleName:"equipment/", type:"equipment/"});
    },

    methods: {
        ...mapActions(["getItemsList", "getItemById", "deleteItemById"]),
        ...mapMutations("equipment/", ["resetForm"]),
        editItem(item) {
            this.editedIndex = item.id;
            this.getItemById({
                itemId: this.editedIndex,
                module: "equipment/",
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
                module: "equipment/",
                successMsg: "Zubehör erfolgreich gelöscht!",
                errorMsg: "Fehler beim Löschen des Zubehör",
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
};
</script>

<style>
tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
