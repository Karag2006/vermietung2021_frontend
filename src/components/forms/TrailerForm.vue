<template>
    
        <v-card>
            <v-card-title class="mb-4">
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row justify="space-around" class="mb-10">
                        <v-col cols="12" md="5" class="">
                            <v-text-field
                                v-model="editedItem['title']"
                                :rules="[
                                    rules.min(8, editedItem['title']),
                                    rules.max(30, editedItem['title']),
                                ]"
                                validate-on-blur
                                label="Anhängerbezeichnung"
                                dense
                                class="mb-4"
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['plateNumber']"
                                label="Kennzeichen"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.required,
                                    rules.max(13, editedItem['plateNumber']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['chassisNumber']"
                                label="Fahrgestellnummer"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.max(50, editedItem['chassisNumber'])
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
                                            <v-icon v-bind="attrs" v-on="on" @click="parseDate(editedItem.tuev)">
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
                                        v-model="editedItem['tuev']"
                                        label="Tüv Fälligkeit"
                                        dense
                                        class="mb-4"
                                        @blur="
                                            parseDate(editedItem['tuev'])
                                        "
                                        :rules="[
                                            rules.isDate(editedItem['tuev']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="5" class="">
                            <v-row dense>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                        v-model="editedItem['totalWeight']"
                                        label="zulässiges Gesamtgewicht"
                                        dense
                                        :rules="[
                                            rules.min(6, editedItem['totalWeight']),
                                            rules.max(7, editedItem['totalWeight']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                        v-model="editedItem['usableWeight']"
                                        label="Nutzlast"
                                        dense
                                        class="mb-4"
                                        :rules="[
                                            rules.min(6, editedItem['usableWeight']),
                                            rules.max(7, editedItem['usableWeight']),
                                        ]"
                                        validate-on-blur
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-text-field
                                v-model="editedItem['loadingSize']"
                                label="Lademaße ( L x B x H cm )"
                                dense
                                class="mb-10"
                                :rules="[
                                    rules.min(6, editedItem['loadingSize']),
                                    rules.max(20, editedItem['loadingSize']),
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
        ...mapState("trailer", {
            editedItem: (state) => state.editedItem,
            date: (state) => state.date,
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Anhänger"
                : this.editedItem.plateNumber + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem","storeNewItem"]),
        ...mapMutations("trailer", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: 'trailer/',
                    successMsg: "Kunden erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Kunden"
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: 'trailer/',
                    successMsg: "Kunden erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Kunden"
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
