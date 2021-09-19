<template>
    <v-dialog v-model="$store.state.user.passwordChange" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Passwort für {{ $store.state.auth.user.username }} ändern</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row justify="space-around" class="mb-10">
                        <v-col cols="12" md="10" class="mt-6">
                            <v-text-field
                                v-model="passwordChangeItem.oldPassword"
                                :rules="[
                                    rules.required,
                                ]"
                                validate-on-blur
                                label="Aktuelles Passwort"
                                dense
                                type="password"
                                class="mb-4"
                            ></v-text-field>
                            <v-text-field
                                v-model="passwordChangeItem.newPassword"
                                label="Neues Passwort"
                                dense
                                class="mb-4"
                                :rules="[
                                    rules.required,
                                    rules.min(6, passwordChangeItem.newPassword),
                                ]"
                                validate-on-blur
                                type="password"
                            ></v-text-field>
                            <v-text-field
                                v-model="passwordChangeItem.newPassword_confirmation"
                                label="Neues Passwort Wiederholen"
                                dense
                                :rules="[
                                    rules.required,
                                    rules.min(6, passwordChangeItem.newPassword_confirmation),
                                    rules.isMatch(passwordChangeItem.newPassword, passwordChangeItem.newPassword_confirmation)
                                ]"
                                validate-on-blur
                                type="password"
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
    data() {
        return {
            dialog: false,
            datePicker: false,
            rules: validationRules
        };
    },
    computed: {
        ...mapState("user", {
            passwordChangeItem: (state) => state.passwordChangeItem,
        }),
    },
    methods: {
        ...mapActions("user", [
            "changePassword",
        ]),
        ...mapMutations("user", ["openChangePw", "closeChangePw"]),
        save() {
            this.changePassword(this.passwordChangeItem)
            
            this.close();
        },
        close() {
            this.closeChangePw()
        },
    },
    watch: {
        
    },
};
</script>

<style></style>
