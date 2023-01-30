export default class Utility {
    static replaceApostrophe = (singleApostropheString) => {
        let doubleApostropheString = singleApostropheString.replace(/'/g, "''");
        return doubleApostropheString;
      }
      
    static manipulateDataForDB = (requestValue) => {
        if (typeof value == 'string') {
            //Replace single apostrophe with double apostrophe.
            requestValue = replaceApostrophe(requestValue);
            //Put single quotes around string value
            requestValue = "'" + requestValue + "'";
        }
        return requestValue;
    }
}