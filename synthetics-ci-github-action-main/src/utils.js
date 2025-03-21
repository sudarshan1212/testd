"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMultiline = exports.parseVariableStrings = void 0;
/**
 * Returns a variables map from a list of strings, each of the form `VARIABLE_NAME=value`.
 */
var parseVariableStrings = function (keyValueStrings, logFunction) {
    if (keyValueStrings === void 0) { keyValueStrings = []; }
    var variables = {};
    for (var _i = 0, keyValueStrings_1 = keyValueStrings; _i < keyValueStrings_1.length; _i++) {
        var keyValueString = keyValueStrings_1[_i];
        var separatorIndex = keyValueString.indexOf('=');
        if (separatorIndex === -1) {
            logFunction("Ignoring variable \"".concat(keyValueString, "\" as separator \"=\" was not found"));
            continue;
        }
        if (separatorIndex === 0) {
            logFunction("Ignoring variable \"".concat(keyValueString, "\" as variable name is empty"));
            continue;
        }
        var key = keyValueString.substring(0, separatorIndex);
        var value = keyValueString.substring(separatorIndex + 1);
        variables[key] = value;
    }
    return Object.keys(variables).length > 0 ? variables : undefined;
};
exports.parseVariableStrings = parseVariableStrings;
var parseMultiline = function (value) {
    return value === null || value === void 0 ? void 0 : value.split(/,|\n/).map(function (variableString) { return variableString.trim(); });
};
exports.parseMultiline = parseMultiline;
