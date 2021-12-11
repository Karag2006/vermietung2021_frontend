export default {
    paymentTypes: ["Bar", "EC-Karte", "Überweisung"],

    priceValues: [
        "totalPrice",
        "nettoPrice",
        "taxValue",
        "reservationDepositValue",
        "finalPaymentValue",
        "contractBail",
    ],

    getFloatValue(commaString) {
        return parseFloat(commaString.replace(",", "."));
    },

    writeFloatWithComma(value) {
        return String(value).replace(".", ",");
    },

    ISOToDE(date) {
        if (date) {
            const [year, month, day] = date.split("-");
            return `${day}.${month}.${year}`;
        }
    },
    DEToISO(date) {
        if (date) {
            const [day, month, year] = date.split(".");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        }
    },
};