import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import { dirname } from "path";
import { fileURLToPath } from "url";
import defaultConfig from "eslint-configuration";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...pluginRouter.configs["flat/recommended"],
  ...defaultConfig,
  pluginReact.configs.flat.recommended,

  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },

  {
    files: ["src/**/*"],
    ignores: ["*.config.{ts,d.ts,js}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "tailwindcss/no-custom-classname": "off",
    },
  },

  {
    files: ["vite.config.ts", "wagmi.config.ts"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {},
  },
]);
