<template>
    <v-navigation-drawer class="secondary" v-model="drawer" app>
        <div class="pa-2">
            <v-img alt="Escobar Logo" src="/site-logo.jpg" contain></v-img>
        </div>

        <v-divider class="grey lighten-1"></v-divider>

        <v-treeview
            v-model="tree"
            :items="items"
            item-key="name"
            open-on-click
            dark
        >
            <template v-slot:prepend="{ item }">
                <v-icon class="mr-2">
                    {{ item.icon }}
                </v-icon>
            </template>
        </v-treeview>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            tree: [],
            items: [
                {
                    name: "Benutzername",
                    icon: "fas fa-user",
                    children: [
                        { name: "Passwort ändern", icon: "fas fa-key" },
                        { name: "Logout", icon: "fas fa-power-off" },
                    ],
                },
                { name: "Dashboard", icon: "fas fa-tachometer-alt" },
                { name: "Kunden", icon: "fas fa-users" },
                { name: "Angebote", icon: "fas fa-id-card-alt" },
                { name: "Reservierungen", icon: "fas fa-address-card" },
                { name: "Mietverträge", icon: "fas fa-file-signature" },
                {
                    name: "Benutzerverwaltung",
                    icon: "fas fa-users",
                    children: [
                        { name: "Rollen", icon: "fas fa-user-tag" },
                        { name: "Benutzer", icon: "fas fa-users-cog" },
                    ],
                },
                {
                    name: "Anhängerverwaltung",
                    icon: "fas fa-trailer",
                    children: [
                        { name: "Anhänger", icon: "fas fa-trailer" },
                        { name: "Zubehör", icon: "fas fa-sitemap" },
                    ],
                },
                { name: "Einstellungen", icon: "fas fa-cogs" },
            ],
            right: null,
        };
    },
    props: ["drawer"],
};
</script>

<style></style>
