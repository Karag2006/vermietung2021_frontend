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
            <TimeComponent 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'collectTime'" 
                :required="true" 
                :label="'Abholung - Uhrzeit'"
            />
            <date-component 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'returnDate'" 
                :required="true" 
                :label="'Rückgabe - Datum'"
            />
            <TimeComponent 
                :cols="12"
                :md="3"
                :storeComponentName="'document'" 
                :elementName="'returnTime'" 
                :required="true" 
                :label="'Rückgabe - Uhrzeit'"
            />
        </v-row>
        <v-row justify="start" class="mb-5">
            <v-col cols="12" md="3" class="d-flex align-center  px-3">
                <v-autocomplete
                    :value="editedItem.collect_address_id"
                    :items="collectAddresses"
                    label="Abhol Anschrift"
                    item-value="id"
                    item-text="name"
                    dense
                    @change="(event) => setSingleValue({elementName: 'collect_address_id', elementValue: event})"
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
                    @change="calculateValues"
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
                    @change="calculateFinalPayment"
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
                    @click="addToTotalPrice(2, 5)"
                ></v-checkbox>
                <v-autocomplete
                    v-model="editedItem.contractBailReturnType"
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

import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"
import helpers from "../../services/helpers"

export default {
    components: {
        DateComponent: require("@/components/forms/formParts/DateComponent.vue").default,
        TimeComponent: require("@/components/forms/formParts/TimeComponent.vue").default,
        EquipmentComponent: require("@/components/forms/formParts/EquipmentComponent.vue").default,
    },

    props: ['editedIndex'],
    
    data() {
        return {
            dialog: false,
            rules: validationRules,
            vueHelpers: helpers,
            pickedTrailer: {},
        };
    },
    computed: {
        ...mapState("collectAddress", {
            collectAddresses: (state) => state.items,
        }),

        editedItem: {
            get() {
                return this.$store.state.document.editedItem
            },
            set (value) {
                this.$store.commit('document/UpdateEditedItem', value)
            }
        },
    },
    methods: {
        ...mapActions(["updateItem", "getItemsList", "getDocumentValues", "getItemById"]),
        ...mapMutations("document", ["resetForm", "parseDate", "formatDate", "setSingleValue"]),
        
        
        calculateValues(){
            this.calculateVatValues()
            this.calculateDeposit()
            this.calculateFinalPayment()
        },
        calculateVatValues(){
            const totalValue = (helpers.getFloatValue(this.editedItem.totalPrice)).toFixed(2)
            if (totalValue > 0) {
                const netValue = (totalValue / (1 + this.editedItem.vat / 100)).toFixed(2)
                const vatValue = (totalValue - netValue).toFixed(2)
                this.editedItem.taxValue = helpers.writeFloatWithComma(vatValue);
                this.editedItem.nettoPrice = helpers.writeFloatWithComma(netValue);
                this.editedItem.totalPrice = helpers.writeFloatWithComma(totalValue);
            }
        },
        calculateDeposit(){
            const totalValue = (helpers.getFloatValue(this.editedItem.totalPrice)).toFixed(2)
            if (totalValue > 0) {
                const depositValue = (totalValue * (1/3)).toFixed(2);
                this.editedItem.reservationDepositValue = helpers.writeFloatWithComma(depositValue)
            }
        },
        calculateFinalPayment(){
            const totalValue = (helpers.getFloatValue(this.editedItem.totalPrice))
            let deposit = (helpers.getFloatValue(this.editedItem.reservationDepositValue))
            let finalPayment = 0.0
            if (totalValue > 0) {
                if (!deposit || deposit == 0) {
                    finalPayment = totalValue.toFixed(2)
                    deposit = (0.0).toFixed(2)
                }
                else
                {
                    finalPayment = (totalValue - deposit).toFixed(2)
                    deposit = deposit.toFixed(2)
                }
                this.editedItem.finalPaymentValue = helpers.writeFloatWithComma(finalPayment)
                this.editedItem.reservationDepositValue = helpers.writeFloatWithComma(deposit)
            }
        },
        addToTotalPrice(amount, times){
            let totalValue = (helpers.getFloatValue(this.editedItem.totalPrice))
            if (totalValue > 0) {
                totalValue = totalValue + (times * amount)
                this.editedItem.totalPrice = helpers.writeFloatWithComma(totalValue.toFixed(2));
                this.calculateVatValues()
                this.calculateFinalPayment()
            }
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
    mounted() {
        this.getItemById({
            module: "options/",
            itemId: 1
        }),
        this.getItemsList({moduleName:"collectAddress/", type:"collectAddress/"});
        this.getItemsList({moduleName:"equipment/", type:"equipment/"});
    },
}
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
