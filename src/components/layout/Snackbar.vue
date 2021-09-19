<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      :color="$store.state.snackbar.color"
    >
      {{ $store.state.snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data: () => ({
    }),
    methods: {
        ...mapMutations(["closeSnackbar"])
    },
}
</script>

<style>

</style>