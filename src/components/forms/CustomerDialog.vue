<template>
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
                    <v-row justify="space-around" class="mb-10">
                        <v-col cols="12" md="5" class="">
                            <v-text-field
                                v-model="editedItem['pass_number']"
                                :rules="[
                                    rules.min(8, editedItem['pass_number']),
                                    rules.max(30, editedItem['pass_number']),
                                ]"
                                validate-on-blur
                                label="Personalausweis Nr."
                                dense
                                class="mb-4"
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['name1']"
                                label="Name / Firma"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.required,
                                    rules.max(50, editedItem['name1']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['name2']"
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
                                        :close-on-content-click="false"
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
                                            <v-icon v-bind="attrs" v-on="on" @click="parseDate(editedItem.birth_date)">
                                                far fa-calendar-alt
                                            </v-icon>
                                        </template>
                                        <v-date-picker
                                            :first-day-of-week="1"
                                            locale="de-de"
                                            :picker-date="date"
                                            :value="date"
                                            @input="datePickerInput($event)"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="11">
                                    <v-text-field
                                        v-model="editedItem['birth_date']"
                                        label="Geburtsdatum"
                                        dense
                                        class="mb-4"
                                        @blur="
                                            parseDate(editedItem['birth_date'])
                                        "
                                        :rules="[
                                            rules.isDate(editedItem['birth_date']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-text-field
                                v-model="editedItem['birth_city']"
                                label="Geburtsort"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.min(3, editedItem['birth_city']),
                                    rules.max(50, editedItem['birth_city']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5" class="">
                            <v-row dense>
                                <v-col cols="12" lg="3">
                                    <v-text-field
                                        v-model="editedItem['plz']"
                                        label="Postleitzahl"
                                        dense
                                        :rules="[
                                            rules.isNumeric(editedItem['plz']),
                                            rules.min(4, editedItem['plz']),
                                            rules.max(5, editedItem['plz']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="9">
                                    <v-text-field
                                        v-model="editedItem['city']"
                                        label="Ort"
                                        dense
                                        class="mb-4"
                                        :rules="[
                                            rules.min(3, editedItem['city']),
                                            rules.max(50, editedItem['city']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-text-field
                                v-model="editedItem['street']"
                                label="Strasse"
                                dense
                                class="mb-10"
                                :rules="[
                                    rules.min(3, editedItem['street']),
                                    rules.max(50, editedItem['street']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['phone']"
                                label="Telefonnummer"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.min(6, editedItem['phone']),
                                    rules.max(15, editedItem['phone']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['car_number']"
                                label="Kennzeichen vom Zugfahrzeug"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.min(5, editedItem['car_number']),
                                    rules.max(20, editedItem['car_number']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['email']"
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
                                v-model="editedItem['driving_license_no']"
                                label="Führerschein Nr."
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.min(6, editedItem['driving_license_no']),
                                    rules.max(15, editedItem['driving_license_no']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-text-field
                                v-model="editedItem['driving_license_class']"
                                label="Führerschein Klasse"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.max(9, editedItem['driving_license_class']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="space-around" dense>
                        <v-col cols="12" md="11">
                            <v-textarea
                                v-model="editedItem['comment']"
                                clearable
                                label="Kommentar"
                                rows="3"
                                :rules="[
                                    rules.max(1000, editedItem['comment']),
                                ]"
                                validate-on-blur
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" text @click="close">
                    Abbrechen
                </v-btn>
                <v-btn color="success darken-2" text @click="save">
                    Speichern
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"

export default {
    props: ['trigger', 'editedIndex'],
    data() {
        return {
            dialog: false,
            datePicker: false,
            rules: validationRules
        };
    },
    computed: {
        ...mapState("customer", {
            editedItem: (state) => state.editedItem,
            date: (state) => state.date,
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Kunde"
                : "Kunden bearbeiten";
        },
    },
    methods: {
        ...mapActions("customer", [
            // "storeNewItem",
            "updateItem",
        ]),
        ...mapActions(["storeNewItem"]),
        ...mapMutations("customer", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem(this.editedItem);
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: 'customer/',
                    successMsg: "Kunden erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Kundens"
                });
            }
            this.close();
        },
        close() {
            this.dialog = false
            this.$emit("close");
            this.$nextTick(() => {
                this.$emit("resetIndex")
            });
        },
        datePickerInput(date) {
            this.datePicker = false;
            this.formatDate(date);
            this.parseDate(this.editedItem.birth_date);
        },
    },
    watch: {
        trigger(val) {
            this.dialog = val
        },
        dialog(val) {
            if (!this.dialog) {
                this.close()
            }
        }
    },
};
</script>

<style></style>
