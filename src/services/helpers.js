export default {
    getFloatValue(kommaString) {
        return parseFloat(kommaString.replace(",", "."))
    },
    writeFloatWithKomma(value) {
        return String(value).replace(".", ",")
    }
}