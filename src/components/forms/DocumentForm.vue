<template>
    <v-container>
        <v-row justify="space-around" class="mb-1">
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
                    clearable
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
            <v-col cols="12" md="5" class="d-flex align-center">
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
                collectDate: false,
                collectTime: false,
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
