import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginRouter from "@tanstack/eslint-plugin-router";
import dragonswap from "eslint-plugin-dragonswap";
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
      globals: globals.browser,
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
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
    plugins: {
      dragonswap,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // "myplugin/no-console-log": "error",
      // "myplugin/no-console-error": "error",
      // "myplugin/no-console-warn": "warn",
      "dragonswap/prefer-react-with-hooks": "error",
    },
  },

  {
    files: ["src/routes/index.tsx"],
    rules: {
      // "myplugin/no-console-error": "error",
    },
  },
]);
