<template>
    <div class="documentEquipmentBlock">
        <v-row v-for="item in selectedEquipmentList" :key="item.id" justify="start" class="mb-1">
            <v-col cols="12" md="3" class="px-3 d-flex align-center">
                {{item.name}}
            </v-col>
            <v-col cols="12" md="3" class="px-3 d-flex align-center">
                <v-text-field
                    v-model="item.number"
                    label="Anzahl"
                >
                </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="px-3 d-flex align-center">
                {{item}}
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-5">
            <v-col cols="12" md="3" class="px-3">
                <v-autocomplete
                    v-model="currentSelectedEquipment"
                    :items="unselectedEquipmentList"
                    label="Zubehör auswählen"
                    item-text="name"
                    dense
                    return-object
                    @change="addToSelectedEquipmentList"
                ></v-autocomplete>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            currentSelectedEquipment: {},
            selectedEquipmentList: [],
        }
    },
    computed: {
        ...mapState("equipment", {
            equipmentList: (state) => state.items,
        }),
        unselectedEquipmentList(){
            let tempList = this.equipmentList
            this.selectedEquipmentList.forEach(element => {
                tempList = tempList.filter( el => el.id !== element.id) 
            });

            return tempList
        }
    },
    methods:{
        addToSelectedEquipmentList(){
            this.currentSelectedEquipment.number = this.currentSelectedEquipment.defaultNumber
            this.selectedEquipmentList.push(this.currentSelectedEquipment)
        },
    }, 
}
</script>

<style>

</style>