<template>
    <v-app id="inspire">
        <v-navigation-drawer class="secondary" v-model="drawer" app>
            <div class="pa-2">
                <v-img alt="Escobar Logo" src="/site-logo.jpg" contain></v-img>
            </div>

            <v-divider class="grey lighten-1"></v-divider>

            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link dark>
                    <v-list-item-icon class="mr-2">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Escobar Anhängercenter</v-toolbar-title>
        </v-app-bar>

        <v-main class="grey lighten-4">
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [
            { title: "Dashboard", icon: "fas fa-tachometer-alt" },
            { title: "Benutzerverwaltung", icon: "fas fa-users" },
            { title: "About", icon: "mdi-help-box" },
        ],
        right: null,
    }),
};
</script>
