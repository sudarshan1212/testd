"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReporter = exports.getDefinedInteger = exports.getDefinedBoolean = exports.getDefinedInput = exports.resolveConfig = void 0;
var core = require("@actions/core");
var utils_1 = require("./utils");
var datadog_ci_1 = require("@datadog/datadog-ci");
var deep_extend_1 = require("deep-extend");
var resolveConfig = function (reporter) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, appKey, batchTimeout, publicIds, datadogSite, configPath, files, testSearchQuery, subdomain, variableStrings, tunnel, failOnCriticalErrors, failOnMissingTests, failOnTimeout, config, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                try {
                    apiKey = core.getInput('api_key', { required: true });
                    appKey = core.getInput('app_key', { required: true });
                }
                catch (error) {
                    core.setFailed('Missing API or APP keys to initialize datadog-ci!');
                    throw error;
                }
                batchTimeout = (0, exports.getDefinedInteger)('batch_timeout');
                publicIds = (0, utils_1.parseMultiline)((0, exports.getDefinedInput)('public_ids'));
                datadogSite = (0, exports.getDefinedInput)('datadog_site');
                configPath = (0, exports.getDefinedInput)('config_path');
                files = (_a = (0, exports.getDefinedInput)('files')) === null || _a === void 0 ? void 0 : _a.split(',').map(function (file) { return file.trim(); });
                testSearchQuery = (0, exports.getDefinedInput)('test_search_query');
                subdomain = (0, exports.getDefinedInput)('subdomain');
                variableStrings = (0, utils_1.parseMultiline)((0, exports.getDefinedInput)('variables'));
                tunnel = (0, exports.getDefinedBoolean)('tunnel');
                failOnCriticalErrors = (0, exports.getDefinedBoolean)('fail_on_critical_errors');
                failOnMissingTests = (0, exports.getDefinedBoolean)('fail_on_missing_tests');
                failOnTimeout = (0, exports.getDefinedBoolean)('fail_on_timeout');
                config = JSON.parse(JSON.stringify(datadog_ci_1.synthetics.DEFAULT_COMMAND_CONFIG));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, datadog_ci_1.utils.resolveConfigFromFile(config, {
                        configPath: configPath,
                        defaultConfigPaths: [datadog_ci_1.synthetics.DEFAULT_COMMAND_CONFIG.configPath],
                    })];
            case 2:
                config = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (configPath) {
                    core.setFailed("Unable to parse config file! Please verify config path: ".concat(configPath));
                    throw error_1;
                }
                return [3 /*break*/, 4];
            case 4:
                // Override with Github Action inputs
                config = (0, deep_extend_1.default)(config, datadog_ci_1.utils.removeUndefinedValues({
                    apiKey: apiKey,
                    appKey: appKey,
                    batchTimeout: batchTimeout,
                    configPath: configPath,
                    datadogSite: datadogSite,
                    defaultTestOverrides: (0, deep_extend_1.default)(config.defaultTestOverrides, datadog_ci_1.utils.removeUndefinedValues({
                        variables: (0, utils_1.parseVariableStrings)(variableStrings, reporter.log.bind(reporter)),
                    })),
                    failOnCriticalErrors: failOnCriticalErrors,
                    failOnMissingTests: failOnMissingTests,
                    failOnTimeout: failOnTimeout,
                    files: files,
                    publicIds: publicIds,
                    subdomain: subdomain,
                    testSearchQuery: testSearchQuery,
                    tunnel: tunnel,
                }));
                return [2 /*return*/, config];
        }
    });
}); };
exports.resolveConfig = resolveConfig;
var getDefinedInput = function (name) {
    var input = core.getInput(name);
    return input !== '' ? input : undefined;
};
exports.getDefinedInput = getDefinedInput;
var getDefinedBoolean = function (name) {
    try {
        if (!(0, exports.getDefinedInput)(name)) {
            return undefined;
        }
        return core.getBooleanInput(name);
    }
    catch (error) {
        core.setFailed(String(error));
        throw error;
    }
};
exports.getDefinedBoolean = getDefinedBoolean;
var getDefinedInteger = function (name) {
    var input = (0, exports.getDefinedInput)(name);
    if (!input) {
        return undefined;
    }
    var number = parseFloat(input);
    if (!Number.isInteger(number)) {
        var error = Error("Invalid value for ".concat(name, ": ").concat(number, " is not an integer"));
        core.setFailed(error);
        throw error;
    }
    return number;
};
exports.getDefinedInteger = getDefinedInteger;
var getReporter = function () {
    var reporters = [new datadog_ci_1.synthetics.DefaultReporter({ context: process })];
    var jUnitReportFilename = (0, exports.getDefinedInput)('junit_report');
    if (jUnitReportFilename) {
        reporters.push(new datadog_ci_1.synthetics.JUnitReporter({ context: process, jUnitReport: jUnitReportFilename }));
    }
    return datadog_ci_1.synthetics.utils.getReporter(reporters);
};
exports.getReporter = getReporter;
