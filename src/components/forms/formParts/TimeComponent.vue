<template>
    <v-col :cols="cols" :md="md" class="d-flex align-center px-3">
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
            @input="value => value && $refs.picker && ($refs.picker.selectingHour = true)"
        >
            <template
                v-slot:activator="{
                    on,
                    attrs,
                }"
            >
                <v-icon 
                    class="mr-4 mb-5"
                    v-bind="attrs" 
                    v-on="on"
                >
                    far fa-clock
                </v-icon>
            </template>
            <v-time-picker
                ref="picker"
                format="24hr"
                v-model="$store.state[storeComponentName].editedItem[elementName]"
                @click:minute="menu = false"
            ></v-time-picker>
        </v-menu>
        <v-text-field
            v-model="$store.state[storeComponentName].editedItem[elementName]"
            :label="label"
            dense
            class="mb-1"
            :rules="[
            ]"
            validate-on-blur
        ></v-text-field>
    </v-col>
</template>

<script>
export default {
    props: ['storeComponentName', 'elementName', 'required', 'label', 'cols', 'md'],
    data() {
        return {
            menu: false,
        }
    },
}
</script>

<style>

</style>