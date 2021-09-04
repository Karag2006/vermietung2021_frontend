<template>
    <v-app id="inspire">
        <nav-drawer 
          :drawer='drawer'
        />
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
  data() {
    return {
      drawer: null
    }
  },
  components: {
    'nav-drawer': require('@/components/layout/Drawer.vue').default
  }
}
</script>
