export default {
    paymentTypes: ["Bar", "EC-Karte", "Überweisung"],
    getFloatValue(commaString) {
        return parseFloat(commaString.replace(",", "."))
    },
    writeFloatWithComma(value) {
        return String(value).replace(".", ",")
    }
}