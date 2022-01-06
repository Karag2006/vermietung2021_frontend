<template>
    <v-container>
        <v-card class="card mx-0 mt-0 pa-0" elevation="0">
            <v-card-text>
                <v-card elevation="0">
                    <v-card-title>
                        <h5>Umsatzsteuer</h5>
                    </v-card-title>
                    <v-card-text>
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
                    </v-card-text>
                </v-card>
                <v-card elevation="0" class="mt-3" v-if="type == 'offer'">
                    <v-card-title>
                        <h5>Angebot Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>
                        <ckeditor
                            v-model="editedItem.offer_note"
                            :config="editorConfig"
                        ></ckeditor> 
                    </v-card-text>
                </v-card>
                <v-card elevation="0" class="mt-3" v-if="type == 'reservation'">
                    <v-card-title>
                        <h5>Reservierung Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>   
                        <ckeditor
                            v-model="editedItem.reservation_note"
                            :config="editorConfig"
                        ></ckeditor>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" class="mt-3" v-if="type == 'contract'">
                    <v-card-title>
                        <h5>Mietvertrag Hinweis-Text</h5>
                    </v-card-title>
                    <v-card-text>
                        <ckeditor
                            v-model="editedItem.contract_note"
                            :config="editorConfig"
                        ></ckeditor>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" class="mt-3">
                    <v-card-title>
                        <h5>Adressdaten</h5>
                    </v-card-title>
                    <v-card-text>
                        <ckeditor
                            v-model="editedItem.contactdata"
                            :config="editorConfig"
                        ></ckeditor>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" class="mt-3">
                    <v-card-title>
                        <h5>Fußzeile</h5>
                    </v-card-title>
                    <v-card-text>
                        <ckeditor
                            v-model="editedItem.document_footer"
                            :config="editorConfig"
                        ></ckeditor>
                    </v-card-text>
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import CKEditor from 'ckeditor4-vue';
import validationRules from "../../services/validationRules"

export default {
    components: {
        ckeditor: CKEditor.component,
    },

    props: ['type'],
    
    data() {
        return {
            rules: validationRules,
            editorConfig: {
                removePlugins: "elementspath,filebrowser,image,showborders,table,tableselection,tabletools,uploadimage"
            },
        };
    },
    computed: {
        editedItem: {
            get() {
                return this.$store.state.document.editedItem
            },
            set (value) {
                this.$store.commit('document/UpdateEditedItem', value)
            }
        },
    },
    methods: {
        
    },
    watch: {
        trigger(val) {
            this.dialog = val
        },
        dialog(val) {
            if (!this.dialog) {
                this.close()
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .vatField {
        width: 2.5rem;
    }
</style>