<template>
    <v-container>
        <v-row justify="space-around" class="my-5">
            <v-col cols="12" md="5">
                <v-select
                    :items="DocumentTrailerList"
                    label="Anhänger auswählen"
                    dense
                ></v-select>
            </v-col>
            <v-col cols="12" md="5">
                &nbsp;
            </v-col>
        </v-row>
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
    </v-container>
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
