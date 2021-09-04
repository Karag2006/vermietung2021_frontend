import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

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
