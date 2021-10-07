<template>
    <div>
        <v-card class="card mx-4 mt-10 pa-2" elevation="3">
            <v-card-title>
                Einstellungen
                <v-btn class="ml-auto" color="darken-4" v-if="!edit" @click="openEdit">
                    Bearbeiten
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-card elevation="2">
                    <v-card-title>
                        <h5>Umsatzsteuer</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="">
                            <v-text-field
                                v-model="editedItem.vat"
                                suffix=" %"
                                dense
                                :rules="[
                                    rules.required,
                                    rules.isNumeric(editedItem.vat)
                                ]"
                                validate-on-blur
                            ></v-text-field>
                            
                        </div>
                        <div v-else>{{editedItem.vat}} %</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="2" class="mt-3">
                    <v-card-title>
                        <h5>Angebot Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="pa-3">
                            <ckeditor
                                    v-model="editedItem.offer_note"
                                    :config="editorConfig"
                            ></ckeditor>
                        </div>
                        <div class="pa-3" v-else v-html="editedItem.offer_note"></div>
                    </v-card-text>
                </v-card>
                <v-card elevation="2" class="mt-3">
                    <v-card-title>
                        <h5>Reservierung Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="pa-3">
                            <ckeditor
                                    v-model="editedItem.reservation_note"
                                    :config="editorConfig"
                            ></ckeditor>
                        </div>
                        <div class="pa-3" v-else v-html="editedItem.reservation_note"></div>
                    </v-card-text>
                </v-card>
                <v-card elevation="2" class="mt-3">
                    <v-card-title>
                        <h5>Mietvertrag Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="pa-3">
                            <ckeditor
                                    v-model="editedItem.contract_note"
                                    :config="editorConfig"
                            ></ckeditor>
                        </div>
                        <div class="pa-3" v-else v-html="editedItem.contract_note"></div>
                    </v-card-text>
                </v-card>
                <v-card elevation="2" class="mt-3">
                    <v-card-title>
                        <h5>Adressdaten</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="pa-3">
                            <ckeditor
                                    v-model="editedItem.contactdata"
                                    :config="editorConfig"
                            ></ckeditor>
                        </div>
                        <div class="pa-3" v-else v-html="editedItem.contactdata"></div>
                    </v-card-text>
                </v-card>
                <v-card elevation="2" class="mt-3">
                    <v-card-title>
                        <h5>Fußzeile</h5>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="edit" class="pa-3">
                            <ckeditor
                                    v-model="editedItem.document_footer"
                                    :config="editorConfig"
                            ></ckeditor>
                            
                        </div>
                        <div class="pa-3" v-else v-html="editedItem.document_footer"></div>
                    </v-card-text>
                </v-card>
            </v-card-text>
            <v-card-actions v-if="edit">
                <v-btn color="success darken-2" @click="save">
                    Speichern
                </v-btn>
                <v-btn color="error darken-2" @click="closeEdit">
                    Abbrechen
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import CKEditor from 'ckeditor4-vue';
import validationRules from "../services/validationRules"

export default {
    name: "Options",
    components: { 
        ckeditor: CKEditor.component
    },
    data: () => ({
        edit: false,
        
        editorConfig: {
            removePlugins: "elementspath,filebrowser,image,showborders,table,tableselection,tabletools,uploadimage"
        },

        rules: validationRules
    }),
    methods: {
        ...mapActions(['getItemById', 'updateItem', 'storeNewItem', 'getItemsList', 'deleteItemById']),
        openEdit() {
            this.edit = true;
        },
        closeEdit(){
            this.edit = false;
        },
        save() {
            this.updateItem({
                item: this.editedItem,
                module: 'options/',
                successMsg: "Einstellungen erfolgreich geändert!",
                errorMsg: "Fehler beim Ändern der Einstellungen"
            });
           
            this.closeEdit();
        },
    },
    computed: {
        ...mapState('options', {
            editedItem: (state) => state.editedItem,
        }),

    },
    mounted() {
        this.getItemById({
            module: "options/",
            itemId: 1
        }),
        this.getItemsList('collectAddress/')
    },

};
</script>

<style scoped>
/deep/ .v-text-field{
    width: 2.5rem;
}
</style>
