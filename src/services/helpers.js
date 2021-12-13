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

    dates: [
        "offerDate",
        "reservationDate",
        "contractDate",
        "collectDate",
        "returnDate",
        "reservationDepositDate",
        "finalPaymentDate",
        "contractBailDate",
        "customer_birth_date",
        "driver_birth_date",
    ],

    listDates: ["collectDate", "returnDate"],

    getFloatValue(commaString) {
        return parseFloat(commaString.replace(",", "."));
    },

    writeFloatWithComma(value) {
        return String(value).replace(".", ",");
    },

    ISOToDE(date) {
        if (date) {
            date = this.trimISO(date)
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
    trimISO(dateString) {
        if (dateString) {
            return dateString.substr(0, 10);
        }
    }
};