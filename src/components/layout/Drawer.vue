<template>
    <v-navigation-drawer class="secondary" v-model="$store.state.navigation.drawer" app>
        <div class="pa-2">
            <v-img alt="Escobar Logo" src="/site-logo.jpg" contain></v-img>
        </div>

        <v-divider class="grey lighten-1"></v-divider>

        <NavMenu />
        
    </v-navigation-drawer>
</template>

<script>
export default {
    components: {
        "NavMenu": require("@/components/layout/NavMenu.vue").default,
    },
    data() {
        return {
            active: [],
            tree: [],
            right: null,
        };
    },
    methods: {
        useMenuEntry(item) {
            if (item[0]) {
                if (item[0].action) {
                    this.$store.dispatch(item[0].action)
                }
                if (item[0].link) {
                    if (this.$router.currentRoute.path != item[0].link) {
                        this.$router.push({path: item[0].link})
                    }
                }
            }
        }
    },
    mounted() {
        if (this.$store.state.auth.status.loggedIn) {
            this.$store.dispatch('getNavMenu')
        }
    },
};
</script>

<style></style>
