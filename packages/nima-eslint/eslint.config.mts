import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: ["js/recommended"],
    plugins: { js },
    languageOptions: {
      globals: globals.node,
      parserOptions: { parser: "tsconfig.json", tsconfigRootDir: __dirname },
    },
  },
]);
