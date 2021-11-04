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
<<<<<<< HEAD
                        itemIdentifier: 'customer',
=======
                        itemIdentifier: 'driver',
>>>>>>> feature_documents
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
<<<<<<< HEAD
                    v-model="editedItem.customer_pass_number"
                    :rules="[
                        rules.min(8, editedItem.customer_pass_number),
                        rules.max(30, editedItem.customer_pass_number),
=======
                    v-model="editedItem.driver_pass_number"
                    :rules="[
                        rules.min(8, editedItem.driver_pass_number),
                        rules.max(30, editedItem.driver_pass_number),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                    label="Personalausweis Nr."
                    dense
                    class="mb-4"
                ></v-text-field>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_name1"
=======
                    v-model="editedItem.driver_name1"
>>>>>>> feature_documents
                    label="Name / Firma"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.required,
<<<<<<< HEAD
                        rules.max(50, editedItem.customer_name1),
=======
                        rules.max(50, editedItem.driver_name1),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_name2"
=======
                    v-model="editedItem.driver_name2"
>>>>>>> feature_documents
                    label="Name 2"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.max(50, editedItem.customer_name2)
=======
                        rules.max(50, editedItem.driver_name2)
>>>>>>> feature_documents
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
<<<<<<< HEAD
                                <v-icon v-bind="attrs" v-on="on" @click="parseDate(editedItem.customer_birth_date)">
=======
                                <v-icon v-bind="attrs" v-on="on" @click="parseDate(editedItem.driver_birth_date)">
>>>>>>> feature_documents
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
<<<<<<< HEAD
                            v-model="editedItem.customer_birth_date"
=======
                            v-model="editedItem.driver_birth_date"
>>>>>>> feature_documents
                            label="Geburtsdatum"
                            dense
                            class="mb-4"
                            @blur="
<<<<<<< HEAD
                                parseDate(editedItem.customer_birth_date)
                            "
                            :rules="[
                                rules.isDate(editedItem.customer_birth_date),
=======
                                parseDate(editedItem.driver_birth_date)
                            "
                            :rules="[
                                rules.isDate(editedItem.driver_birth_date),
>>>>>>> feature_documents
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_birth_city"
=======
                    v-model="editedItem.driver_birth_city"
>>>>>>> feature_documents
                    label="Geburtsort"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.min(3, editedItem.customer_birth_city),
                        rules.max(50, editedItem.customer_birth_city),
=======
                        rules.min(3, editedItem.driver_birth_city),
                        rules.max(50, editedItem.driver_birth_city),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" class="">
                <v-row dense>
                    <v-col cols="12" lg="3">
                        <v-text-field
<<<<<<< HEAD
                            v-model="editedItem.customer_plz"
                            label="Postleitzahl"
                            dense
                            :rules="[
                                rules.isNumeric(editedItem.customer_plz),
                                rules.min(4, editedItem.customer_plz),
                                rules.max(5, editedItem.customer_plz),
=======
                            v-model="editedItem.driver_plz"
                            label="Postleitzahl"
                            dense
                            :rules="[
                                rules.isNumeric(editedItem.driver_plz),
                                rules.min(4, editedItem.driver_plz),
                                rules.max(5, editedItem.driver_plz),
>>>>>>> feature_documents
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="9">
                        <v-text-field
<<<<<<< HEAD
                            v-model="editedItem.customer_city"
=======
                            v-model="editedItem.driver_city"
>>>>>>> feature_documents
                            label="Ort"
                            dense
                            class="mb-4"
                            :rules="[
<<<<<<< HEAD
                                rules.min(3, editedItem.customer_city),
                                rules.max(50, editedItem.customer_city),
=======
                                rules.min(3, editedItem.driver_city),
                                rules.max(50, editedItem.driver_city),
>>>>>>> feature_documents
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_street"
=======
                    v-model="editedItem.driver_street"
>>>>>>> feature_documents
                    label="Strasse"
                    dense
                    class="mb-10"
                    :rules="[
<<<<<<< HEAD
                        rules.min(3, editedItem.customer_street),
                        rules.max(50, editedItem.customer_street),
=======
                        rules.min(3, editedItem.driver_street),
                        rules.max(50, editedItem.driver_street),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_phone"
=======
                    v-model="editedItem.driver_phone"
>>>>>>> feature_documents
                    label="Telefonnummer"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.min(6, editedItem.customer_phone),
                        rules.max(15, editedItem.customer_phone),
=======
                        rules.min(6, editedItem.driver_phone),
                        rules.max(15, editedItem.driver_phone),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_car_number"
=======
                    v-model="editedItem.driver_car_number"
>>>>>>> feature_documents
                    label="Kennzeichen vom Zugfahrzeug"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.min(5, editedItem.customer_car_number),
                        rules.max(20, editedItem.customer_car_number),
=======
                        rules.min(5, editedItem.driver_car_number),
                        rules.max(20, editedItem.driver_car_number),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_email"
=======
                    v-model="editedItem.driver_email"
>>>>>>> feature_documents
                    label="E-Mail Adresse"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.isEmail(editedItem.customer_email)
=======
                        rules.isEmail(editedItem.driver_email)
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="space-around" dense>
            <v-col cols="12" md="5">
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_driving_license_no"
=======
                    v-model="editedItem.driver_driving_license_no"
>>>>>>> feature_documents
                    label="Führerschein Nr."
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.min(6, editedItem.customer_driving_license_no),
                        rules.max(15, editedItem.customer_driving_license_no),
=======
                        rules.min(6, editedItem.driver_driving_license_no),
                        rules.max(15, editedItem.driver_driving_license_no),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
                <v-text-field
<<<<<<< HEAD
                    v-model="editedItem.customer_driving_license_class"
=======
                    v-model="editedItem.driver_driving_license_class"
>>>>>>> feature_documents
                    label="Führerschein Klasse"
                    dense
                    class="mb-4"
                    :rules="[
<<<<<<< HEAD
                        rules.max(9, editedItem.customer_driving_license_class),
=======
                        rules.max(9, editedItem.driver_driving_license_class),
>>>>>>> feature_documents
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="space-around" dense>
            <v-col cols="12" md="11">
                <v-textarea
<<<<<<< HEAD
                    v-model="editedItem.customer_comment"
=======
                    v-model="editedItem.driver_comment"
>>>>>>> feature_documents
                    clearable
                    label="Kommentar"
                    rows="3"
                    :rules="[
<<<<<<< HEAD
                        rules.max(1000, editedItem.customer_comment),
=======
                        rules.max(1000, editedItem.driver_comment),
>>>>>>> feature_documents
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
        this.getItemsList("customer/");
    },
};
</script>

<style></style>
