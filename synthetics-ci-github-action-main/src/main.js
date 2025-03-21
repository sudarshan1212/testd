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
exports.printSummary = void 0;
var core = require("@actions/core");
var resolve_config_1 = require("./resolve-config");
var datadog_ci_1 = require("@datadog/datadog-ci");
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var reporter, config, startTime, _a, results, summary, orgSettings, exitReason, error_1, exitReason;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                datadog_ci_1.synthetics.utils.setCiTriggerApp('github_action');
                core.info("this is   synthetics.utils.setCiTriggerApp(github_action)',\n".concat(datadog_ci_1.synthetics.utils.setCiTriggerApp('github_action')));
                reporter = (0, resolve_config_1.getReporter)();
                return [4 /*yield*/, (0, resolve_config_1.resolveConfig)(reporter)];
            case 1:
                config = _b.sent();
                startTime = Date.now();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, datadog_ci_1.synthetics.executeTests(reporter, config)];
            case 3:
                _a = _b.sent(), results = _a.results, summary = _a.summary;
                return [4 /*yield*/, datadog_ci_1.synthetics.utils.getOrgSettings(reporter, config)];
            case 4:
                orgSettings = _b.sent();
                core.info("'main.ts results, summary ', ".concat(summary, " ").concat(summary));
                datadog_ci_1.synthetics.utils.renderResults({
                    config: config,
                    orgSettings: orgSettings,
                    reporter: reporter,
                    results: results,
                    startTime: startTime,
                    summary: summary,
                });
                datadog_ci_1.synthetics.utils.reportExitLogs(reporter, config, { results: results });
                exitReason = datadog_ci_1.synthetics.utils.getExitReason(config, { results: results });
                if (exitReason !== 'passed') {
                    core.setFailed("Datadog Synthetics tests failed: ".concat((0, exports.printSummary)(summary, config)));
                }
                else {
                    core.info("\n\nDatadog Synthetics tests succeeded: ".concat((0, exports.printSummary)(summary, config)));
                }
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                datadog_ci_1.synthetics.utils.reportExitLogs(reporter, config, { error: error_1 });
                exitReason = datadog_ci_1.synthetics.utils.getExitReason(config, { error: error_1 });
                if (exitReason !== 'passed') {
                    core.setFailed('Running Datadog Synthetics tests failed.');
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var printSummary = function (summary, config) {
    var baseUrl = datadog_ci_1.synthetics.utils.getAppBaseURL(config);
    var batchUrl = datadog_ci_1.synthetics.utils.getBatchUrl(baseUrl, summary.batchId);
    return ("criticalErrors: ".concat(summary.criticalErrors, ", passed: ").concat(summary.passed, ", failedNonBlocking: ").concat(summary.failedNonBlocking, ", failed: ").concat(summary.failed, ", skipped: ").concat(summary.skipped, ", notFound: ").concat(summary.testsNotFound.size, ", timedOut: ").concat(summary.timedOut, "\n") +
        "Results URL: ".concat(batchUrl));
};
exports.printSummary = printSummary;
if (require.main === module) {
    run();
}
exports.default = run;
// Force embed of version in build files from package.json for release check
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
require('../package.json').name;
require('../package.json').version;
