export default class Utility {
    static replaceApostrophe = (singleApostropheString) => {
        let doubleApostropheString = singleApostropheString.replace(/'/g, "''");
        return doubleApostropheString;
    }

    static manipulateDataForDB = (requestValue) => {
        if (typeof value == 'string') {
            requestValue = replaceApostrophe(requestValue);
            requestValue = "'" + requestValue + "'";
        }
        return requestValue;
    }
}