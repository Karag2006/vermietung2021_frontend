export default {
    rules: {
        required: (value) => !!value || "Darf nicht leer sein",
        min(minNum, value) {
            if (!value) return true;
            value = String(value);
            if (value.length >= minNum) return true;
            return "Mindestens " + minNum + " Zeichen";
        },
        max(maxNum, value) {
            if (!value) return true;
            value = String(value);
            if (value.length <= maxNum) return true;
            return "Maximal " + maxNum + " Zeichen";
        },
        isNumeric(value) {
            if (!value) return true;
            if (!isNaN(value)) return true;
            return "Nur Zahlen sind erlaubt";
        },
        isEmail(value) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!value) return true;
            if (pattern.test(value)) return true;
            return "Muss eine gültige E-Mail Adresse sein.";
        },
        isDate(value) {
            const pattern = /^(?:[0-9]{2})\.(?:[0-9]{2})\.(?:[0-9]{4})$/;
            if (!value) return true;
            if (pattern.test(value)) return true;
            return "Das Datum Muss im Format dd.mm.YYYY vorliegen";
        },
    },
};