<template>
    <v-container>
        <v-row justify="space-around" class="mb-10">
            <v-col cols="12" md="5" class="d-flex align-center">
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
                            class="mr-4 mb-7"
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
                    label="Abholdatum"
                    dense
                    class="mb-4"
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
            <v-col cols="12" md="5" class="">
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
                            v-bind="attrs" 
                            v-on="on" 
                            @click="parseDate({date: editedItem.collectDate, dateVariable: 'collectDate'})"
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
                    label="Abholdatum"
                    dense
                    class="mb-4"
                    @blur="
                        parseDate({date: editedItem.collectDate, dateVariable: 'collectDate'})
                    "
                    :rules="[
                        rules.required,
                        rules.isDate(editedItem.collectDate),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="space-around" class="mb-10">
            <v-col cols="12" md="5" class="">
                <v-text-field
                    v-model="editedItem.vehicle_plateNumber"
                    label="Kennzeichen"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.required,
                        rules.max(13, editedItem.vehicle_plateNumber),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-text-field
                    v-model="editedItem.vehicle_chassisNumber"
                    label="Fahrgestellnummer"
                    dense
                    class="mb-4"
                    :rules="[
                        rules.max(50, editedItem.vehicle_chassisNumber),
                    ]"
                    validate-on-blur
                ></v-text-field>
                <v-row dense>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="editedItem.vehicle_totalWeight"
                            label="zulässiges Gesamtgewicht"
                            dense
                            :rules="[
                                rules.min(6, editedItem.vehicle_totalWeight),
                                rules.max(7, editedItem.vehicle_totalWeight),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field
                            v-model="editedItem.vehicle_usableWeight"
                            label="Nutzlast"
                            dense
                            class="mb-4"
                            :rules="[
                                rules.min(6, editedItem.vehicle_usableWeight),
                                rules.max(7, editedItem.vehicle_usableWeight),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field
                    v-model="editedItem.vehicle_loadingSize"
                    label="Lademaße ( L x B x H cm )"
                    dense
                    class="mb-10"
                    :rules="[
                        rules.min(6, editedItem.vehicle_loadingSize),
                        rules.max(20, editedItem.vehicle_loadingSize),
                    ]"
                    validate-on-blur
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import validationRules from "../../services/validationRules"

export default {
    data() {
        return {
            dialog: false,
            picker: {
                collectDate: false
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
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Anhänger"
                : this.editedItem.plateNumber + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem","storeNewItem", "getItemsList", "getDocumentValues"]),
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
            //this.parseDate(this.editedItem.birth_date);
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
        this.getItemsList("trailer/");
    },
};
</script>

<style></style>
