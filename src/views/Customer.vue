<template>
    <v-card class="card mx-4 mt-10" elevation="3">
        <v-card-text>
            <v-data-table :headers="headers" :items="items">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title
                            ><h4 class="component-title">
                                Kundenliste
                            </h4></v-toolbar-title
                        >

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
                                        fas fa-user-plus
                                    </v-icon>
                                    Kunden hinzufügen
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row
                                            justify="space-around"
                                            class="mb-10"
                                        >
                                            <v-col cols="12" md="5" class="">
                                                <v-text-field
                                                    v-model="
                                                        editedItem[
                                                            'pass_number'
                                                        ]
                                                    "
                                                    label="Personalausweis Nr."
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['name1']
                                                    "
                                                    label="Name / Firma"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['name2']
                                                    "
                                                    label="Name 2"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                                <v-menu
                                                    v-model="menu2"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :nudge-right="40"
                                                    transition="scale-transition"
                                                    offset-y
                                                    min-width="auto"
                                                >
                                                    <template
                                                        v-slot:activator="{
                                                            on,
                                                            attrs,
                                                        }"
                                                    >
                                                        <v-text-field
                                                            v-model="
                                                                editedItem[
                                                                    'birth_date'
                                                                ]
                                                            "
                                                            label="Geburtsdatum"
                                                            prepend-icon="mdi-calendar"
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            dense
                                                            class="mb-4"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="
                                                            editedItem[
                                                                'birth_date'
                                                            ]
                                                        "
                                                        @input="menu2 = false"
                                                    ></v-date-picker>
                                                </v-menu>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['birth_city']
                                                    "
                                                    label="Geburtsort"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="5" class="">
                                                <v-row dense>
                                                    <v-col cols="12" lg="3">
                                                        <v-text-field
                                                            v-model="
                                                                editedItem[
                                                                    'plz'
                                                                ]
                                                            "
                                                            label="Postleitzahl"
                                                            dense
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" lg="9">
                                                        <v-text-field
                                                            v-model="
                                                                editedItem[
                                                                    'city'
                                                                ]
                                                            "
                                                            label="Ort"
                                                            dense
                                                            class="mb-4"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['street']
                                                    "
                                                    label="Strasse"
                                                    dense
                                                    class="mb-10"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['phone']
                                                    "
                                                    label="Telefonnummer"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['car_number']
                                                    "
                                                    label="Kennzeichen vom Zugfahrzeug"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['email']
                                                    "
                                                    label="E-Mail Adresse"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="space-around" dense>
                                            <v-col cols="12" md="5">
                                                <v-text-field
                                                    v-model="
                                                        editedItem[
                                                            'driving_license_no'
                                                        ]
                                                    "
                                                    label="Führerschein Nr."
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="5">
                                                <v-text-field
                                                    v-model="
                                                        editedItem[
                                                            'driving_license_class'
                                                        ]
                                                    "
                                                    label="Führerschein Klasse"
                                                    dense
                                                    class="mb-4"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                    >
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
    data: () => ({
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        menu2: false,
    }),

    computed: {
        ...mapState("customer", {
            items: (state) => state.items,
            headers: (state) => state.listHeaders,
            editedItem: (state) => state.editedItem,
            defaultItem: (state) => state.defaultItem,
        }),
        // both titles need to be provided as variables
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Kunde"
                : "Kunden bearbeiten";
        },
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

        ...mapMutations("customer", ["resetForm"]),

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
            // Remove the item identifeid by editedIndex from the Array.
            // this.items.splice(this.editedIndex, 1);
            this.deleteItemById(this.editedIndex)
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
                // save the element identifeid by editedIndex with the new data
                this.updateItem(this.editedItem)
                // Object.assign(
                //     this.items[this.editedIndex],
                //     this.localEditedItem
                // );
            } else {
                // save as new element
                this.storeNewItem(this.editedItem)
                // this.items.push(this.editedItem);
            }
            this.close();
        },
    },
};
</script>

<style>
tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>
