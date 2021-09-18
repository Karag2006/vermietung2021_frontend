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
                                                    :rules="[
                                                        rules.min(8, editedItem['pass_number']), 
                                                        rules.max(30, editedItem['pass_number'])
                                                    ]"
                                                    validate-on-blur
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
                                                    :rules="[
                                                        rules.required, 
                                                        rules.max(50, editedItem['name1'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['name2']
                                                    "
                                                    label="Name 2"
                                                    dense
                                                    class="mb-4"
                                                    :rules="[
                                                        rules.max(50, editedItem['name2'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                                <v-row>
                                                    <v-col cols="1">
                                                        <v-menu
                                                            v-model="datePicker"
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
                                                                <v-icon
                                                                    v-bind="
                                                                        attrs
                                                                    "
                                                                    v-on="on"
                                                                >
                                                                    far
                                                                    fa-calendar-alt
                                                                </v-icon>
                                                            </template>
                                                            <v-date-picker
                                                                :first-day-of-week="
                                                                    1
                                                                "
                                                                locale="de-de"
                                                                :picker-date="
                                                                    date
                                                                "
                                                                :value="date"
                                                                @input="
                                                                    datePickerInput(
                                                                        $event
                                                                    )
                                                                "
                                                            ></v-date-picker>
                                                        </v-menu>
                                                    </v-col>
                                                    <v-col cols="11">
                                                        <v-text-field
                                                            v-model="
                                                                editedItem[
                                                                    'birth_date'
                                                                ]
                                                            "
                                                            label="Geburtsdatum"
                                                            dense
                                                            class="mb-4"
                                                            @blur="
                                                                parseDate(
                                                                    editedItem[
                                                                        'birth_date'
                                                                    ]
                                                                )
                                                            "
                                                            :rules="[
                                                                rules.isDate(editedItem['birth_date'])
                                                            ]"
                                                            validate-on-blur
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>

                                                <v-text-field
                                                    v-model="
                                                        editedItem['birth_city']
                                                    "
                                                    label="Geburtsort"
                                                    dense
                                                    class="mb-4"
                                                    :rules="[
                                                        rules.min(3, editedItem['birth_city']), 
                                                        rules.max(50, editedItem['birth_city'])
                                                    ]"
                                                    validate-on-blur
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
                                                            :rules="[
                                                                rules.isNumeric(editedItem['plz']), 
                                                                rules.min(4, editedItem['plz']), 
                                                                rules.max(5, editedItem['plz'])
                                                            ]"
                                                            validate-on-blur
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
                                                            :rules="[
                                                                rules.min(3, editedItem['city']), 
                                                                rules.max(50, editedItem['city'])
                                                            ]"
                                                            validate-on-blur
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
                                                    :rules="[
                                                        rules.min(3, editedItem['street']), 
                                                        rules.max(50, editedItem['street'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['phone']
                                                    "
                                                    label="Telefonnummer"
                                                    dense
                                                    class="mb-4"
                                                    :rules="[
                                                        rules.min(6, editedItem['phone']), 
                                                        rules.max(15, editedItem['phone'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['car_number']
                                                    "
                                                    label="Kennzeichen vom Zugfahrzeug"
                                                    dense
                                                    class="mb-4"
                                                    :rules="[
                                                        rules.min(5, editedItem['car_number']), 
                                                        rules.max(20, editedItem['car_number'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                                <v-text-field
                                                    v-model="
                                                        editedItem['email']
                                                    "
                                                    label="E-Mail Adresse"
                                                    dense
                                                    class="mb-4"
                                                    :rules="[
                                                        rules.isEmail(editedItem['email'])
                                                    ]"
                                                    validate-on-blur
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
                                                    :rules="[
                                                        rules.min(6, editedItem['driving_license_no']), 
                                                        rules.max(15, editedItem['driving_license_no'])
                                                    ]"
                                                    validate-on-blur
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
                                                    :rules="[ 
                                                        rules.max(9, editedItem['driving_license_class'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row  justify="space-around" dense>
                                            <v-col cols="12" md="11">
                                                <v-textarea
                                                    v-model="
                                                        editedItem[
                                                            'comment'
                                                        ]
                                                    "
                                                    clearable
                                                    label="Kommentar"
                                                    rows="3"
                                                    :rules="[ 
                                                        rules.max(1000, editedItem['comment'])
                                                    ]"
                                                    validate-on-blur
                                                ></v-textarea>
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
        datePicker: false,
        search: "",
        rules: {
            required: value => !!value || 'Darf nicht leer sein',
            min(minNum, value) {
                if (!value) return true;
                value = String(value)
                if (value.length >= minNum) return true;
                return 'Mindestens ' + minNum + ' Zeichen';
            },
            max(maxNum, value) {
                if (!value) return true;
                value = String(value)
                if (value.length <= maxNum) return true;
                return 'Maximal ' + maxNum + ' Zeichen';
            },
            isNumeric(value) {
                if (!value) return true;
                if (!isNaN(value)) return true;
                return 'Nur Zahlen sind erlaubt'
            },
            isEmail(value) {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!value) return true;
                if (pattern.test(value)) return true;
                return 'Muss eine gültige E-Mail Adresse sein.'
            },
            isDate(value) {
                const pattern = /^(?:[0-9]{2})\.(?:[0-9]{2})\.(?:[0-9]{4})$/
                if (!value) return true;
                if (pattern.test(value)) return true;
                return 'Das Datum Muss im Format dd.mm.YYYY vorliegen'
            }
        },
    }),

    computed: {
        ...mapState("customer", {
            items: (state) => state.items,
            headers: (state) => state.listHeaders,
            editedItem: (state) => state.editedItem,
            defaultItem: (state) => state.defaultItem,
            date: (state) => state.date,
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
