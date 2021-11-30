export default {

    // Payment helpers
    paymentTypes: ["Bar", "EC-Karte", "Überweisung"],
    getFloatValue(commaString) {
        return parseFloat(commaString.replace(",", "."));
    },
    writeFloatWithComma(value) {
        return String(value).replace(".", ",");
    },


    // Date Helpers
    germanDateToIso(date) {
        if (!date) {
            const result = new Date().toISOString().substr(0, 10);
            return result;
        }
        const [day, month, year] = date.split(".");
        const result = `${year}-${month.padStart(2, "0")}-${day.padStart(
            2,
            "0"
        )}`;
        return result;
    },
    isoToGermanDate(date) {
        if (date) {
            const [year, month, day] = date.split("-");
            const result = `${day}.${month}.${year}`;
            return result;
        }
    },
};
