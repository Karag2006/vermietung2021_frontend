<template>
    <v-list dark dense>
        <div v-for="entry in $store.state.navigation.navMenu" :key="entry.id">
            <v-list-item v-if="!entry.children && entry.link" :to="entry.link">
                <v-list-item-icon>
                    <v-icon>{{ entry.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ entry.name }}</v-list-item-title>
            </v-list-item>
            <v-list-group v-else :prepend-icon="entry.icon" active-class="v-list-item--active">
                <template v-slot:activator>
                    <v-list-item-title>{{ entry.name }}</v-list-item-title>
                </template>
                <div v-for="child in entry.children" :key="child.id">
                    <v-list-item class="pl-12" v-if="child.link" :to="child.link">
                        <v-list-item-icon>
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title>{{ child.name }}</v-list-item-title>
                    </v-list-item>
                </div>
            </v-list-group>
        </div>
    </v-list>
</template>

<script>
export default {
    
};
</script>

<style scoped>
    >>>.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
        min-width: 0;
        margin-left: 0;
    }
    .v-application .primary--text{
        color: inherit !important;
    }
</style>
