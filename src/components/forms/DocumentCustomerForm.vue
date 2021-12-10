<template>
    <v-container>
        <v-row justify="space-around" class="my-5">
            <v-col cols="12" md="5">
                <v-autocomplete
                    v-model="customer"
                    :items="list"
                    label="Kunden auswählen"
                    item-text="selector"
                    item-value="id"
                    return-object
                    dense
                    clearable
                    @change="getDocumentValues({
                        module: 'customer/',
                        itemId: customer.id,
                        itemIdentifier: 'customer',
                    })"
                ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="5">
                &nbsp;
            </v-col>
        </v-row>
        <v-row justify="space-around" class="mb-10">
            <v-col cols="12" md="5" class="">
                <v-text-field
                    v-model="editedItem.customer_pass_number"
                    :rules="[
                        rules.min(8, editedItem.customer_pass_number),
                        rules.max(30, editedItem.customer_pass_number),
                    ]"
                    validate-on-blur
                    label="Personalausweis Nr."
                    dense
                    class="mb-4"
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.customer_name1"
                    label="Name / Firma"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.required,
                        rules.max(50, editedItem.customer_name1),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.customer_name2"
                    label="Name 2"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.max(50, editedItem.customer_name2)
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
                                <v-icon v-bind="attrs" v-on="on" @click="parseDate(editedItem.customer_birth_date)">
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
                            v-model="editedItem.customer_birth_date"
                            label="Geburtsdatum"
                            dense
                            class="mb-4"
                            @blur="
                                parseDate(editedItem.customer_birth_date)
                            "
                            :rules="[
                                rules.isDate(editedItem.customer_birth_date),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-text-field
                    v-model="editedItem.customer_birth_city"
                    label="Geburtsort"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.min(3, editedItem.customer_birth_city),
                        rules.max(50, editedItem.customer_birth_city),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" class="">
                <v-row dense>
                    <v-col cols="12" lg="3">
                        <v-text-field
                            v-model="editedItem.customer_plz"
                            label="Postleitzahl"
                            dense
                            :rules="[
                                rules.isNumeric(editedItem.customer_plz),
                                rules.min(4, editedItem.customer_plz),
                                rules.max(5, editedItem.customer_plz),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="9">
                        <v-text-field
                            v-model="editedItem.customer_city"
                            label="Ort"
                            dense
                            class="mb-4"
                            :rules="[
                                rules.min(3, editedItem.customer_city),
                                rules.max(50, editedItem.customer_city),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="editedItem.customer_street"
                    label="Strasse"
                    dense
                    class="mb-10"
                    :rules="[
                        rules.min(3, editedItem.customer_street),
                        rules.max(50, editedItem.customer_street),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.customer_phone"
                    label="Telefonnummer"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.min(6, editedItem.customer_phone),
                        rules.max(15, editedItem.customer_phone),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.customer_car_number"
                    label="Kennzeichen vom Zugfahrzeug"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.min(5, editedItem.customer_car_number),
                        rules.max(20, editedItem.customer_car_number),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.customer_email"
                    label="E-Mail Adresse"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.isEmail(editedItem.customer_email)
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="space-around" dense>
            <v-col cols="12" md="5">
                <v-text-field
                    v-model="editedItem.customer_driving_license_no"
                    label="Führerschein Nr."
                    dense
                    class="mb-4"
                    :rules="[
                        rules.min(6, editedItem.customer_driving_license_no),
                        rules.max(15, editedItem.customer_driving_license_no),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
                <v-text-field
                    v-model="editedItem.customer_driving_license_class"
                    label="Führerschein Klasse"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.max(9, editedItem.customer_driving_license_class),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="space-around" dense>
            <v-col cols="12" md="11">
                <v-textarea
                    v-model="editedItem.customer_comment"
                    clearable
                    label="Kommentar"
                    rows="3"
                    :rules="[
                        rules.max(1000, editedItem.customer_comment),
                    ]"
                    validate-on-blur
                ></v-textarea>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"

export default {
    props: ['trigger', 'editedIndex', 'type'],
    data() {
        return {
            dialog: false,
            datePicker: false,
            rules: validationRules,
            customer: {},
        };
    },
    computed: {
        ...mapState("customer", {
            list: (state) => state.items,
            date: (state) => state.date,
        }),
        ...mapState("document", {
            editedItem: (state) => state.editedItem,
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Kunde"
                : this.editedItem.name1 + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem","storeNewItem", 'getItemsList', "getDocumentValues"]),
        ...mapMutations("customer", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: 'customer/',
                    successMsg: "Kunden erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Kunden"
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: 'customer/',
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
    mounted() {
        this.getItemsList({moduleName:"customer/", type:"customer/"});
    },
};
</script>

<style></style>
