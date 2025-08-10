import rules from "../rules/index.js";
import Plugin from "@typescript-eslint/eslint-plugin";

const pluginNIMA = {
  meta: {
    name: "eslint-plugin-example",
    version: "1.2.3",
    namespace: "example",
  },
  configs: {
    recommended: {
      plugins: [""],
      rules: {},
    },
  },
  rules,
};

export default pluginNIMA;
