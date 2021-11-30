<template>
    <div class="documentEquipmentBlock">
        <v-row justify="start" class="mb-1">
            <v-col cols="12" md="6" class="px-3">
                <h3 class="mb-2">Zubehör:</h3>
            </v-col>
        </v-row>
        <v-row justify="start" class="mb-1">
            <v-col cols="12" sm="6" class="px-3">
                <v-row justify="start" class="mb-5">
                    <v-col cols="12" md="12" class="px-1">
                        <v-autocomplete
                            v-model="editedItem.selectedEquipmentList"
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
            <v-col cols="12" sm="6" class="px-1">
                <v-row v-for="item in editedItem.selectedEquipmentList" :key="item.id" justify="start" class="mb-1">
                        <v-col cols="12" sm="2" class="px-3 d-flex align-center">
                            <v-text-field
                                v-model="item.number"
                                dense
                                suffix="x"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" lg="3" class="d-flex align-center mb-4 mb-md-0">
                            {{item.name}}
                        </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState("equipment", {
            equipmentList: (state) => state.items,
        }), 
        editedItem: {
            get() {
                return this.$store.state.document.editedItem
            },
            set (value) {
                this.$store.commit('document/UpdateEditedItem', value)
            }
        },
    },
    methods:{
        checkNumbers(){
            this.editedItem.selectedEquipmentList.forEach(element => {
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