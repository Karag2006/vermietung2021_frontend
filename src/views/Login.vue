<template>
    <v-card class="card mx-auto" elevation="5" max-width="35rem">
        <v-img alt="Escobar Logo" src="/site-logo.jpg" contain></v-img>
        <v-card-text class="pa-5">
            <v-form class="mt-3">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="username"
                                label="Benutzername"
                                dense
                                
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="password"
                                label="Passwort"
                                dense
                                type="password"
                                @keyup.enter="login"
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>

        <v-card-actions class="pa-5">
            <v-btn
                outlined
                class="text-h5 font-weight-bold primary white--text ml-auto pa-4"
                @click="login"
            >
                Login
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        login(){
            this.$store.dispatch('userLogin', {'username': this.username, 'password': this.password})
        }
    },
};
</script>

<style>
.card {
    margin-top: 10rem;
}
</style>
