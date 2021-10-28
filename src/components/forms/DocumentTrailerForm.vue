<template>
    <v-container>
        <v-row justify="space-around" class="my-5">
            <v-col cols="12" md="5">
                <v-select
                    v-model="pickedTrailer"
                    :items="trailerList"
                    label="Anhänger auswählen"
                    item-text="selector"
                    item-value="plateNumber"
                    return-object
                    dense
                    @change="getDocumentValues({
                        module: 'trailer/',
                        itemId: pickedTrailer.id,
                    })"
                ></v-select>
            </v-col>
            <v-col cols="12" md="5">
                &nbsp;
            </v-col>
        </v-row>
        <v-row justify="space-around" class="mb-10">
            <v-col cols="12" md="5" class="">
                <v-text-field
                    v-model="editedItem.vehicle_title"
                    :rules="[
                        rules.min(8, editedItem.vehicle_title),
                        rules.max(30, editedItem.vehicle_title),
                    ]"
                    validate-on-blur
                    label="Anhängerbezeichnung"
                    dense
                    class="mb-4"
                ></v-text-field>
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
            </v-col>
            <v-col cols="12" md="5" class="">
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
            datePicker: false,
            rules: validationRules,
            pickedTrailer: {},
        };
    },
    computed: {
        ...mapState("trailer", {
            trailerList: (state) => state.items,
            date: (state) => state.date,
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
        ...mapActions(["updateItem","storeNewItem", "getItemsList", "getDocumentValues"]),
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
