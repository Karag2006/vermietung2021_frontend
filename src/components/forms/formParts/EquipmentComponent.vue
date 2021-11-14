<template>
    <div class="documentEquipmentBlock">
        <v-row justify="start" class="mb-1">
            <v-col cols="12" md="6" class="px-3">
                <h3 class="mb-2">Zubehör:</h3>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-1">
            <v-col cols="12" md="6" class="px-3">
                <v-row justify="start" class="mb-5">
                    <v-col cols="12" md="12" class="px-3">
                        <v-autocomplete
                            v-model="selectedEquipmentList"
                            :items="equipmentList"
                            
                            item-text="name"
                            return-object
                            multiple
                            dense
                            chips
                            deletable-chips
                            
                            @change="checkNumbers"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="6" class="px-3">
                <v-row v-for="item in selectedEquipmentList" :key="item.id" justify="start" class="mb-1">
                    
                        <v-col cols="12" md="4" lg="3" class="px-3 d-flex align-center mb-4 mb-md-0">
                            {{item.name}}
                        </v-col>
                        <v-col cols="12" md="2" class="px-3 d-flex align-center">
                            <v-text-field
                                v-model="item.number"
                                label="Anzahl"
                                dense
                            >
                            </v-text-field>
                        </v-col>
                    
                </v-row>
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
            number: 1,
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
        checkNumbers(){
            console.log(this.selectedEquipmentList)
            this.selectedEquipmentList.forEach(element => {
                if (!element.number) {
                    element.number = element.defaultNumber
                }
            });
        },
    }, 
}
</script>

<style>

</style>