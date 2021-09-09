<template>
    <v-list dark dense>
        <div v-for="entry in $store.state.navigation.navMenu" :key="entry.id">
            <v-list-item v-if="!entry.children">
                <v-list-item-icon>
                    <v-icon>{{ entry.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ entry.name }}</v-list-item-title>
            </v-list-item>
            <v-list-group v-else :prepend-icon="entry.icon">
                <template v-slot:activator>
                    <v-list-item-title>{{ entry.name }}</v-list-item-title>
                </template>
                <div v-for="child in entry.children" :key="child.id">
                    <v-list-item class="ml-5">
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

<style></style>
