<template>
    <v-col :cols="cols" :md="md" class="d-flex align-center px-3">
        <v-menu
            v-model="menuDisplay"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
        >
            <template
                v-slot:activator="{
                    on,
                    attrs,
                }"
            >
                <v-icon 
                    class="mr-4 mb-3"
                    v-bind="attrs" 
                    v-on="on" 
                    @click="parseDate($store.state[storeComponentName].editedItem[elementName])"
                >
                    far fa-calendar-alt
                </v-icon>
            </template>
            <v-date-picker
                :first-day-of-week="1"
                locale="de-de"
                :value="localDate"
                @input="datePickerInput($event)"
            ></v-date-picker>
        </v-menu>
        <v-text-field
            v-if="!required"
            v-model="$store.state[storeComponentName].editedItem[elementName]"
            :label="label"
            dense
            class="mb-1"
            @blur="parseDate($store.state[storeComponentName].editedItem[elementName])"
            :rules="[
                rules.isDate($store.state[storeComponentName].editedItem[elementName])
            ]"
            validate-on-blur
        ></v-text-field>
        <v-text-field
            v-else
            v-model="$store.state[storeComponentName].editedItem[elementName]"
            :label="label"
            dense
            class="mb-1"
            @blur="parseDate($store.state[storeComponentName].editedItem[elementName])"
            :rules="[
                rules.required,
                rules.isDate($store.state[storeComponentName].editedItem[elementName])
            ]"
            validate-on-blur
        ></v-text-field>
    </v-col>
</template>

<script>
import validationRules from "@/services/validationRules"

export default {
    props: ['storeComponentName', 'elementName', 'required', 'label', 'cols', 'md'],
    data() {
        return {
            localDate: "",
            menuDisplay: false,
            rules: validationRules,
        }
    },
    computed: {
    },
    methods: {
        
        parseDate(date) {
            if (date) {
                const [day, month, year] = date.split(".");
                this.localDate = `${year}-${month.padStart(
                    2,
                    "0"
                )}-${day.padStart(2, "0")}`;
            } else {
               this.localDate = new Date()
                   .toISOString()
                   .substr(0, 10);
            }
        },
        formatDate(date) {
            if (date) {
                const [year, month, day] = date.split("-");
                let statePayload = {}
                statePayload.elementName = this.elementName;
                statePayload.elementValue = `${day}.${month}.${year}`;
                this.$store.commit(this.storeComponentName + "/setSingleValue", statePayload)
            }
        },
        datePickerInput(date) {
            this.menuDisplay = false;
            this.formatDate(date);
        },
    },
}
</script>

<style>

</style>