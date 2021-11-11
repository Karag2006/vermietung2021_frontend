<template>
    <v-container>
        <v-row justify="start" class="mb-5 mt-6">
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'collectDate'" 
                :required="true" 
                :label="'Abholung - Datum'"
            />
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
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'returnDate'" 
                :required="true" 
                :label="'Rückgabe - Datum'"
            />
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
        <v-row justify="start" class="mb-5">
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-autocomplete
                    v-model="editedItem.collect_address_id"
                    :items="collectAddresses"
                    label="Abhol Anschrift"
                    item-value="id"
                    item-text="name"
                    dense
                ></v-autocomplete>
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
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'reservationDepositDate'" 
                :required="false" 
                :label="'Anzahlung - bis Datum'"
            />
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
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'finalPaymentDate'" 
                :required="false" 
                :label="'Restzahlung - Datum'"
            />
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
                ></v-text-field>
            </v-col>
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'contractBailDate'" 
                :required="false" 
                :label="'Kaution - Datum'"
            />
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
        <EquipmentComponent />
    </v-container>
</template>

<script>


import Vue from 'vue'
import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"
import helpers from "../../services/helpers"

export default {
    components: {
        DateComponent: require("@/components/forms/formParts/DateComponent.vue").default,
        EquipmentComponent: require("@/components/forms/formParts/EquipmentComponent.vue").default,
    },
    
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
        ...mapState("collectAddress", {
            collectAddresses: (state) => state.items,
        }),
        ...mapState("document", {
            editedItem: (state) => state.editedItem,
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
        this.getItemsList("equipment/");
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
