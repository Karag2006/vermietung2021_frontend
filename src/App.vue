<template>
    <v-app id="inspire">
        <nav-drawer />
        <v-app-bar app>
            <v-app-bar-nav-icon
                v-if="$store.state.auth.status.loggedIn"
                @click="$store.commit('toggleNavDrawer')"
            ></v-app-bar-nav-icon>

            <v-toolbar-title>Escobar Anhängercenter</v-toolbar-title>
            <div class="mr-0 ml-auto mr-md-5">
                <v-menu
                    transition="slide-y-transition"
                    bottom
                    v-if="$store.state.auth.status.loggedIn"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            elevation="2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon dark class="mr-2">
                                fas fa-user
                            </v-icon>
                            {{ $store.state.auth.user.username }}
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item
                            v-for="(item, i) in userMenuItems"
                            :key="i"
                            @click="itemClicked(item)"
                            link
                        >
                            <v-list-item-icon>
                              <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{
                                item.name
                            }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>

        <v-main class="grey lighten-4">
            <password-change/>
            <router-view></router-view>
            <snackbar/>
        </v-main>
    </v-app>
</template>

<script>
export default {
    components: {
        "nav-drawer": require("@/components/layout/Drawer.vue").default,
        "snackbar": require("@/components/layout/Snackbar.vue").default,
        "password-change": require("@/components/forms/PasswordChangeDialog.vue").default
    },
    data() {
        return {
            userMenuItems: [
                { name: "Passwort ändern", icon: "fas fa-key", mutation: "user/openChangePw" },
                {
                    name: "Logout",
                    icon: "fas fa-power-off",
                    action: "userLogout",
                },
            ],
        };
    },
    methods: {
        itemClicked(item) {
            if (item.action) {
                this.$store.dispatch(item.action);
            }
            if (item.mutation) {
                this.$store.commit(item.mutation)
            }
            if (item.link) {
                if (this.$router.currentRoute.path != item.link) {
                    this.$router.push({ path: item.link });
                }
            }
        },
    },
};
</script>

<style lang="css">
.v-btn {
    text-transform: capitalize !important;
}
</style>
