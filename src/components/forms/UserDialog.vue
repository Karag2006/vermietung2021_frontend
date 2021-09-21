<template>
    <v-dialog v-model="dialog" max-width="1200px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="pa-5"
                color="success"
                dark
                elevation="2"
                v-bind="attrs"
                v-on="on"
                @click="resetForm"
            >
                <v-icon dark class="mr-2">
                    fas fa-user-plus
                </v-icon>
                Benutzer hinzufügen
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row justify="space-around" class="mb-10">
                        <v-col cols="12" md="5" class="">
                            <v-text-field
                                v-model="editedItem['username']"
                                :rules="[
                                    rules.required,
                                    rules.max(30, editedItem['username']),
                                ]"
                                validate-on-blur
                                label="Benutzername (Name fürs Einloggen)"
                                dense
                                class="mb-4"
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['name']"
                                label="Name"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.required,
                                    rules.max(50, editedItem['name']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['email']"
                                label="E-Mail Addresse"
                                dense
                                class="mb-4"
                                :rules="[
                                rules.required,
                                    rules.isEmail(editedItem['email']),
                                    rules.max(191, editedItem['email']),
                                ]"
                                validate-on-blur
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="5" class="">
                             <v-text-field
                                v-model="editedItem['password']"
                                label="Passwort"
                                dense
                                :rules="[
                                    rules.required,
                                    rules.min(6, editedItem.password),
                                ]"
                                type="password"
                                validate-on-blur
                            ></v-text-field>
                            <v-text-field
                                v-model="editedItem['password_confirmation']"
                                label="Passwort Wiederholen"
                                dense
                                :rules="[
                                    rules.required,
                                    rules.min(6, editedItem.password_confirmation),
                                    rules.isMatch(editedItem.password, editedItem.password_confirmation)
                                ]"
                                type="password"
                                validate-on-blur
                            ></v-text-field>
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
    </v-dialog>
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
        ...mapState("user", {
            editedItem: (state) => state.editedItem,
        }),
        formTitle() {
            return this.editedIndex === -1
                ? "Neuer Kunde"
                : "Kunden bearbeiten";
        },
    },
    methods: {
        ...mapActions(["updateItem","storeNewItem"]),
        ...mapMutations("user", ["resetForm"]),
        save() {
            if (this.editedIndex > -1) {
                this.updateItem({
                    item: this.editedItem,
                    module: 'user/',
                    successMsg: "Benutzer erfolgreich geändert!",
                    errorMsg: "Fehler beim Ändern des Benutzers"
                });
            } else {
                this.storeNewItem({
                    item: this.editedItem,
                    module: 'user/',
                    successMsg: "Benutzer erfolgreich angelegt!",
                    errorMsg: "Fehler beim Anlegen des Benutzers"
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
};
</script>

<style></style>
