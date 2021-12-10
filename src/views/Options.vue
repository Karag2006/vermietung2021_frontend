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
                                class="vatField"
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
        <v-card class="card mx-4 mt-10" elevation="3">
            <v-card-text>
                <v-data-table :headers="$store.state.collectAddress.listHeaders" :items="$store.state.collectAddress.items">
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>
                                <h4 class="component-title mb-4">
                                    Abholadressen
                                </h4>
                            </v-toolbar-title>
                        </v-toolbar>
                    </template>
                    <template v-slot:item="{ item }">
                        <tr v-if="editMode === item.id">
                            <td>
                                <v-text-field
                                    v-model="$store.state.collectAddress.editedItem.name"
                                    dense
                                    :rules="[
                                        rules.required,
                                    ]"
                                    validate-on-blur
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                    v-model="$store.state.collectAddress.editedItem.address"
                                    dense
                                    :rules="[
                                        rules.required,
                                    ]"
                                    validate-on-blur
                                ></v-text-field>
                            </td>
                            <td>
                                <v-icon
                                    color="success"
                                    small
                                    class="mr-4"
                                    @click="saveAddress"
                                >
                                    fas fa-save
                                </v-icon>
                                <v-icon
                                    color="red darken-2"
                                    small
                                    @click="cancel"
                                >
                                    fas fa-window-close
                                </v-icon>
                            </td>
                        </tr>
                        <v-data-table-row v-else :headers="$store.state.collectAddress.listHeaders" :item="item" >
                            <template v-slot:actions="{ item }">
                                <v-icon
                                    color="success"
                                    small
                                    class="mr-4"
                                    @click="editAddress(item)"
                                >
                                    far fa-edit
                                </v-icon>
                                <v-icon
                                    color="red darken-2"
                                    small
                                    @click="deleteItem(item)"
                                >
                                    fas fa-trash-alt
                                </v-icon>
                            </template>
                        </v-data-table-row>
                    </template>
                    <template v-slot:body.append>
                        <tr>
                            <td>
                                <v-text-field
                                    v-model="newAddress.name"
                                    dense
                                    :rules="[
                                        rules.required,
                                    ]"
                                    validate-on-blur
                                ></v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                    v-model="newAddress.address"
                                    dense
                                    :rules="[
                                        rules.required,
                                    ]"
                                    validate-on-blur
                                ></v-text-field>
                            </td>
                            <td>
                                <v-icon
                                    color="success"
                                    small
                                    class="mr-4"
                                    @click="saveNewAddress"
                                >
                                    fas fa-plus
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                    
                </v-data-table>
            </v-card-text>
        </v-card>
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="text-h5"
                    >Abholadresse wirklich löschen? <br />
                    <h6>
                        Dies kann nicht rückgängig gemacht
                        werden
                    </h6></v-card-title
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="closeDelete"
                        >Abbrechen</v-btn
                    >
                    <v-btn
                        color="red darken-1"
                        text
                        @click="deleteItemConfirm"
                        >Löschen</v-btn
                    >
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex';
import CKEditor from 'ckeditor4-vue';
import validationRules from "../services/validationRules"
import Row from 'vuetify/lib/components/VDataTable/Row.js';

export default {
    name: "Options",
    components: { 
        ckeditor: CKEditor.component,
        'v-data-table-row': Row 
    },
    data: () => ({
        edit: false,
        dialogDelete: false,
        editMode: -1,
        search: "",
        newAddress: {
            name: "",
            address: ""
        },
        
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
        editAddress(address) { 
            this.$store.state.collectAddress.editedIndex = address.id;
            this.getItemById({
                itemId: this.$store.state.collectAddress.editedIndex,
                module: "collectAddress/",
            });
            this.editMode = address.id;
        },
        cancel(){
            this.$store.state.collectAddress.editedIndex = -1
            this.editMode = -1
        },
        saveAddress(){
            this.updateItem({
                item: this.$store.state.collectAddress.editedItem,
                module: 'collectAddress/',
                successMsg: "Abholadresse erfolgreich geändert!",
                errorMsg: "Fehler beim Ändern der Adresse"
            });
            this.cancel();
        },
        saveNewAddress(){
            this.storeNewItem({
                item: this.newAddress,
                module: 'collectAddress/',
                successMsg: "Abholadresse erfolgreich hinzugefügt!",
                errorMsg: "Fehler beim Hinzufügen der Adresse"
            });
            this.newAddress.name = "";
            this.newAddress.address = ""
        },
        deleteItem(address) {
            this.$store.state.collectAddress.editedIndex = address.id;
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.deleteItemById({
                id: this.$store.state.collectAddress.editedIndex,
                module: "collectAddress/",
                successMsg: "Abholadresse erfolgreich gelöscht!",
                errorMsg: "Fehler beim Löschen der Abholadresse",
            });
            this.closeDelete();
        },
        closeDelete() {
            // reset Delete Dialog
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.$store.state.collectAddress.editedIndex = -1;
            });
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
        this.getItemsList({moduleName:"collectAddress/", type:"collectAddress/"});
    },

};
</script>

<style scoped>
    .vatField {
        width: 2.5rem;
    }
</style>
