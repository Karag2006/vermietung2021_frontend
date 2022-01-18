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
                    Vertragsdaten
                </v-tab>
                <v-tab>
                    Einstellungen
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
                    <DocumentForm
                        :editedIndex="editedIndex"
                    />
                </v-tab-item>
                <v-tab-item>
                    <!-- Tab4 -->
                    <SettingsForm
                        :type="'reservation'"
                    />
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
        DocumentDriverForm: require("@/components/forms/DocumentDriverForm.vue").default,
        DocumentForm: require("@/components/forms/DocumentForm.vue").default,
        SettingsForm: require("@/components/forms/DocumentSettingsForm.vue").default
    },
    props: ["trigger", "editedIndex"],
    data() {
        return {
            // dialog: false,
            datePicker: false,
            rules: validationRules,
        };
    },
    computed: {
        editedItem: {
            get() {
                return this.$store.state.document.editedItem
            },
            set (value) {
                this.$store.commit('document/UpdateEditedItem', value)
            }
        },
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Mietvertrag"
                : "Mietvertrag " + this.editedItem.contractNumber + " bearbeiten";
        },
        dialog: {
            get() {
                return this.$store.state.dialog
            },
            set (value) {
                this.$store.commit('UpdateDialog', value)
            }
        },
    },
    methods: {
        ...mapActions(["updateItem", "storeNewItem", "getItemById"]),
        
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    documentType: "contract",
                    module: "document/",
                    successMsg: "Mietvertrag erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Mietvertrag",
                });
            } else {
                
                this.storeNewItem({
                    documentType: "contract",
                    module: "document/",
                    successMsg: "Mietvertrag erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Mietvertrag",
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
    mounted() {
        this.getItemById({
            moduleName: "options/",
            type: "options/",
            itemId: 1
        })
    },
};
</script>

<style></style>
