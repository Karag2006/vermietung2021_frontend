<template>
    <v-card>
        <v-card-title class="mb-4">
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-tabs>
                <v-tabs-slider></v-tabs-slider>

                <!-- Tab definitions -->

                <v-tab>
                    Kunde
                </v-tab>
                <v-tab>
                    Fahrer
                </v-tab>
                <v-tab>
                    Anhänger
                </v-tab>
                <v-tab>
                    Angebot
                </v-tab>

                <!-- Tab Content  -->

                <v-tab-item>
                    <!-- Tab1 -->
                    <DocumentCustomerForm
                        :type="'customer'"
                    />
                </v-tab-item>
                <v-tab-item>
                    <!-- Tab2 -->
                    <DocumentDriverForm
                        :type="'driver'"
                    />

                </v-tab-item>
                <v-tab-item>
                    <!-- Tab3 -->
                    <DocumentTrailerForm/>
                </v-tab-item>
                <v-tab-item>
                    <!-- Tab4 -->
                    
                </v-tab-item>
            </v-tabs>
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
    components: {
        DocumentTrailerForm: require("@/components/forms/DocumentTrailerForm.vue").default,
        DocumentCustomerForm: require("@/components/forms/DocumentCustomerForm.vue").default,
        DocumentDriverForm: require("@/components/forms/DocumentCustomerForm.vue").default,
    },
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
                ? "Neues Angebot"
                : "Angebot " + this.editedItem.offerNumber + " bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem", "storeNewItem"]),
        ...mapMutations("document", ["resetForm", "parseDate", "formatDate"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: "document/",
                    successMsg: "Angebot erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Angebot",
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: "document/",
                    successMsg: "Angebot erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Angebot",
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
