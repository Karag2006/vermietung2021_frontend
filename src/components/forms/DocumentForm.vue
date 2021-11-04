<template>
    <v-container>
        <v-row justify="start" class="my-5">
            <v-col cols="12" md="3" class="d-flex align-center px-3">
                <v-menu
                    v-model="picker.collectDate"
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
                        <v-icon 
                            class="mr-4 mb-3"
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({
                                date: editedItem.collectDate, 
                                dateVariable: 'collectDate'
                            })"
                        >
                            far fa-calendar-alt
                        </v-icon>
                    </template>
                    <v-date-picker
                        :first-day-of-week="1"
                        locale="de-de"
                        :value="collectDate"
                        @input="datePickerInput($event, 'collectDate')"
                    ></v-date-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.collectDate"
                    label="Abholung - Datum"
                    dense
                    class="mb-1"
                    @blur="parseDate({
                        date: editedItem.collectDate, 
                        dateVariable: 'collectDate'
                    })"
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.collectDate),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center px-3">
                <v-menu
                    v-model="picker.collectTime"
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
                        <v-icon 
                            class="mr-4 mb-5"
                            v-bind="attrs" 
                            v-on="on"
                        >
                            far fa-clock
                        </v-icon>
                    </template>
                    <v-time-picker
                        format="24hr"
                        v-model="editedItem.collectTime"
                        @click:minute="picker.collectTime = false"
                    ></v-time-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.collectTime"
                    label="Abholung - Uhrzeit"
                    dense
                    class="mb-1"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="d-flex align-center px-3">
                <v-menu
                    v-model="picker.returnDate"
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
                        <v-icon 
                            class="mr-4 mb-3"
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({
                                date: editedItem.returnDate, 
                                dateVariable: 'returnDate'
                            })"
                        >
                            far fa-calendar-alt
                        </v-icon>
                    </template>
                    <v-date-picker
                        :first-day-of-week="1"
                        locale="de-de"
                        :value="returnDate"
                        @input="datePickerInput($event, 'returnDate')"
                    ></v-date-picker>
                </v-menu>
                <!-- TODO: create rule to make sure returnDate >= collectDate -->
                <v-text-field
                    v-model="editedItem.returnDate"
                    label="Rückgabe - Datum"
                    dense
                    class="mb-1"
                    @blur="parseDate({
                        date: editedItem.returnDate, 
                        dateVariable: 'returnDate'
                    })"
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.returnDate),
                        
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-menu
                    v-model="picker.returnTime"
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
                        <v-icon 
                            class="mr-4 mb-5"
                            v-bind="attrs" 
                            v-on="on"
                        >
                            far fa-clock
                        </v-icon>
                    </template>
                    <v-time-picker
                        format="24hr"
                        v-model="editedItem.returnTime"
                        @click:minute="picker.returnTime = false"
                    ></v-time-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.returnTime"
                    label="Rückgabe - Uhrzeit"
                    dense
                    class="mb-1"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-1">
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="editedItem.totalPrice"
                    label="Preis (Brutto)"
                    dense
                    class="mb-1 px-3"
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                    @change="calculatePrices"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="editedItem.nettoPrice"
                    label="Netto Preis (wird automatisch berechnet)"
                    dense
                    disabled
                    class="mb-1 px-3"
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                    v-model="editedItem.taxValue"
                    label="Umsatzsteuer (wird automatisch berechnet)"
                    dense
                    disabled
                    prefix="€"
                    class="mb-1 px-3"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"
import helpers from "../../services/helpers"

export default {
    data() {
        return {
            dialog: false,
            picker: {
                collectDate: false,
                collectTime: false,
                returnDate: false,
                returnTime: false,
            },
            rules: validationRules,
            pickedTrailer: {},
        };
    },
    computed: {
        ...mapState("trailer", {
            trailerList: (state) => state.items,
        }),
        ...mapState("document", {
            editedItem: (state) => state.editedItem,
            collectDate: (state) => state.collectDate,
            collectTime: (state) => state.collectTime,
            returnDate: (state) => state.returnDate,
            returnTime: (state) => state.returnTime,
        }),

        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Anhänger"
                : this.editedItem.plateNumber + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem","storeNewItem", "getItemsList", "getDocumentValues", "getItemById"]),
        ...mapMutations("document", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: 'trailer/',
                    successMsg: "Anhänger erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Anhänger"
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: 'trailer/',
                    successMsg: "Anhänger erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Anhänger"
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
        datePickerInput(date, dateVariable) {
            this.picker[dateVariable] = false;
            this.formatDate({
                date: date, 
                dateVariable: dateVariable
            });
        },
        calculatePrices(){
            const totalValue = (helpers.getFloatValue(this.editedItem.totalPrice)).toFixed(2)
            if (totalValue > 0) {
                const vatPercentage = this.$store.state.options.editedItem.vat
                const netValue = (totalValue / (1 + vatPercentage / 100)).toFixed(2)
                const vatValue = (totalValue - netValue).toFixed(2)
                Vue.set(this.editedItem, "taxValue", helpers.writeFloatWithKomma(vatValue));
                Vue.set(this.editedItem, "nettoPrice", helpers.writeFloatWithKomma(netValue));
                Vue.set(this.editedItem, "totalPrice", helpers.writeFloatWithKomma(totalValue));
            }
        }
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
    mounted() {
        this.getItemById({
            module: "options/",
            itemId: 1
        }),
        this.getItemsList('collectAddress/')
    },
};
</script>

<style>
    .row {
        margin: 0;
    }
    .row + .row{
        margin-top: 0;
    }
    .col-md-5, .col-12{
        padding: 0;
    }
</style>
