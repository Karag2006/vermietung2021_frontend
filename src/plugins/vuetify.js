import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

// import plugin
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'

const vuetify = new Vuetify();

Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify, // same as "vuetify: vuetify"
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: "fa",
});

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.darken2, // #E53935
                secondary: colors.blueGrey.darken2, // #FFCDD2
                accent: colors.blue.base, // #3F51B5
            },
        },
    },
});
