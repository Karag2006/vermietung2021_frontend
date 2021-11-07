<template>
    <v-container>
        <v-row justify="start" class="mb-5 mt-6">
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
        <v-row justify="start">
            <v-col cols="12" md="4" class="mb-1 px-3">
                <v-text-field
                    v-model="editedItem.totalPrice"
                    label="Preis (Brutto)"
                    dense
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                    @change="calculateVatValues"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mb-1 px-3">
                <v-text-field
                    v-model="editedItem.nettoPrice"
                    label="Netto Preis (wird automatisch berechnet)"
                    dense
                    disabled
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mb-1 px-3">
                <v-text-field
                    v-model="editedItem.taxValue"
                    label="Umsatzsteuer (wird automatisch berechnet)"
                    dense
                    disabled
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-5 mt-6">
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-text-field
                    v-model="editedItem.reservationDepositValue"
                    label="Anzahlung"
                    dense
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                    @change="calculatePaymentValues"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-menu
                    v-model="picker.reservationDepositDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{on, attrs,}">
                        <v-icon 
                            class="mr-4 mb-3"
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({
                                date: editedItem.reservationDepositDate, 
                                dateVariable: 'reservationDepositDate'
                            })"
                        >
                            far fa-calendar-alt
                        </v-icon>
                    </template>
                    <v-date-picker
                        :first-day-of-week="1"
                        locale="de-de"
                        :value="reservationDepositDate"
                        @input="datePickerInput($event, 'reservationDepositDate')"
                    ></v-date-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.reservationDepositDate"
                    label="Anzahlung - bis Datum"
                    dense
                    class="mb-1"
                    @blur="parseDate({
                        date: editedItem.reservationDepositDate, 
                        dateVariable: 'reservationDepositDate'
                    })"
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.reservationDepositDate),   
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-autocomplete
                    v-model="editedItem.reservationDepositType"
                    :items="vueHelpers.paymentTypes"
                    label="Zahlart Anzahlung"
                    dense
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-checkbox
                    class="inverseCheckbox"
                    v-model="editedItem.reservationDepositRecieved"
                    label="Anzahlung eingegangen"
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-5">
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-text-field
                    v-model="editedItem.finalPaymentValue"
                    label="Restzahlung"
                    dense
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                    @change="calculatePaymentValues"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-menu
                    v-model="picker.finalPaymentDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{on, attrs,}">
                        <v-icon 
                            class="mr-4 mb-3"
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({
                                date: editedItem.finalPaymentDate, 
                                dateVariable: 'finalPaymentDate'
                            })"
                        >
                            far fa-calendar-alt
                        </v-icon>
                    </template>
                    <v-date-picker
                        :first-day-of-week="1"
                        locale="de-de"
                        :value="finalPaymentDate"
                        @input="datePickerInput($event, 'finalPaymentDate')"
                    ></v-date-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.finalPaymentDate"
                    label="Restzahlung - Datum"
                    dense
                    class="mb-1"
                    @blur="parseDate({
                        date: editedItem.finalPaymentDate, 
                        dateVariable: 'finalPaymentDate'
                    })"
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.finalPaymentDate),   
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-autocomplete
                    v-model="editedItem.finalPaymentType"
                    :items="vueHelpers.paymentTypes"
                    label="Zahlart Restzahlung"
                    dense
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-checkbox
                    class="inverseCheckbox"
                    v-model="editedItem.finalPaymentRecieved"
                    label="Restzahlung eingegangen"
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-5">
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-text-field
                    v-model="editedItem.contractBail"
                    label="Kaution"
                    dense
                    prefix="€"
                    :rules="[
                    ]"
                    validate-on-blur
                    @change="calculatePaymentValues"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-menu
                    v-model="picker.contractBailDate"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                    <template v-slot:activator="{on, attrs,}">
                        <v-icon 
                            class="mr-4 mb-3"
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({
                                date: editedItem.contractBailDate, 
                                dateVariable: 'contractBailDate'
                            })"
                        >
                            far fa-calendar-alt
                        </v-icon>
                    </template>
                    <v-date-picker
                        :first-day-of-week="1"
                        locale="de-de"
                        :value="contractBailDate"
                        @input="datePickerInput($event, 'contractBailDate')"
                    ></v-date-picker>
                </v-menu>
                <v-text-field
                    v-model="editedItem.contractBailDate"
                    label="Kaution - Datum"
                    dense
                    class="mb-1"
                    @blur="parseDate({
                        date: editedItem.contractBailDate, 
                        dateVariable: 'contractBailDate'
                    })"
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.contractBailDate),   
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="px-3">
                <v-checkbox
                    class="inverseCheckbox"
                    v-model="editedItem.contractBailRecieved"
                    label="Kaution erhalten"
                ></v-checkbox>
                <v-autocomplete
                    v-model="editedItem.contractBailType"
                    :items="vueHelpers.paymentTypes"
                    label="Zahlart Kaution"
                    dense
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="3" class="px-3">
                <v-checkbox
                    class="inverseCheckbox"
                    v-model="editedItem.contractBailReturned"
                    label="Kaution erstattet"
                ></v-checkbox>
                <v-autocomplete
                    v-model="editedItem.contractBailType"
                    :items="vueHelpers.paymentTypes"
                    label="Zahlart Kaution Erstattung"
                    dense
                ></v-autocomplete>
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
                reservationDepositDate: false,
                finalPaymentDate: false,
                contractBailDate: false,
            },
            rules: validationRules,
            vueHelpers: helpers,
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
            reservationDepositDate: (state) => state.reservationDepositDate,
            finalPaymentDate: (state) => state.finalPaymentDate,
            contractBailDate: (state) => state.contractBailDate,
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
        calculateVatValues(){
            const totalValue = (helpers.getFloatValue(this.editedItem.totalPrice)).toFixed(2)
            if (totalValue > 0) {
                const vatPercentage = this.$store.state.options.editedItem.vat
                const netValue = (totalValue / (1 + vatPercentage / 100)).toFixed(2)
                const vatValue = (totalValue - netValue).toFixed(2)
                Vue.set(this.editedItem, "taxValue", helpers.writeFloatWithComma(vatValue));
                Vue.set(this.editedItem, "nettoPrice", helpers.writeFloatWithComma(netValue));
                Vue.set(this.editedItem, "totalPrice", helpers.writeFloatWithComma(totalValue));
            }
        },
        calculatePaymentValues(){

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
    .inverseCheckbox .v-input__slot{
        flex-direction: row-reverse;
        align-items: center;
        justify-items: flex-end;

    }
    .inverseCheckbox .v-label{
        flex: 0 0 auto !important; 
        margin-right: 0.5rem;
    }
    .inverseCheckbox .v-input--selection-controls__input{
        margin-right: auto;
    }
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
