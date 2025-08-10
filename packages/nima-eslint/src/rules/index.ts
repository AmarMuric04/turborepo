import { noHandlerSuffix } from "./no-handler-suffix.js";
import { noConsoleLog } from "./no-console-log.js";
import { noConsoleError } from "./no-console.error.js";
import { noConsoleWarn } from "./no-console-warn.js";

const rules = {
  "no-handler-suffix": noHandlerSuffix,
  "no-console-log": noConsoleLog,
  "no-console-error": noConsoleError,
  "no-console-warn": noConsoleWarn,
};

export default rules;
