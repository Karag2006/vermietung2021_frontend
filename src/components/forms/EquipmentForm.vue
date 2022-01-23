<template>
    <v-card>
        <v-card-title class="mb-4">
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row justify="space-around" class="mb-10">
                    <v-col cols="12" lg="5">
                        <v-text-field
                            v-model="editedItem['name']"
                            label="Bezeichnung"
                            dense
                            :rules="[
                                rules.min(5, editedItem['name']),
                                rules.max(50, editedItem['name']),
                                rules.required,
                            ]"
                            validate-on-blur
                        ></v-text-field>
                        <v-text-field
                            v-model="editedItem['defaultNumber']"
                            label="Standard Anzahl"
                            dense
                            :rules="[
                                rules.min(1, editedItem['defaultNumber']),
                                rules.max(2, editedItem['defaultNumber']),
                                rules.isNumeric(editedItem['defaultNumber']),
                            ]"
                            validate-on-blur
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="5">
                        <v-textarea
                            v-model="editedItem['details']"
                            clearable
                            label="Details"
                            rows="2"
                            :rules="[
                                rules.min(10, editedItem['details']),
                                rules.max(600, editedItem['details']),
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
import validationRules from "../../services/validationRules";

export default {
    props: ["trigger", "editedIndex"],
    data() {
        return {
            dialog: false,
            datePicker: false,
            rules: validationRules,
        };
    },
    computed: {
        ...mapState("equipment", {
            editedItem: (state) => state.editedItem,
            date: (state) => state.date,
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neues Zubehör"
                : this.editedItem.name + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem", "storeNewItem"]),
        ...mapMutations("equipment", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: "equipment",
                    successMsg: "Zubehör erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Zubehör",
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: "equipment",
                    successMsg: "Zubehör erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Zubehör",
                });
            }
            this.close();
        },
        close() {
            this.dialog = false;
            this.$emit("close");
            this.$nextTick(() => {
                this.$emit("resetIndex");
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
            this.dialog = val;
        },
        dialog(val) {
            if (!this.dialog) {
                this.close();
            }
        },
    },
};
</script>

<style></style>
