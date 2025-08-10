import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pluginNIMA from "nima-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      parserOptions: {
        parser: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },

  // @ts-expect-error ---
  tseslint.configs.recommended,

  {
    files: ["**/*"],
    ignores: ["**/*.js", "**/*.test.ts", "**/*.config.mts"],
    rules: {
      "max-lines": ["error", 100],
    },
  },

  {
    plugins: {
      // @ts-expect-error ---
      myplugin: pluginNIMA,
    },
    rules: {
      "myplugin/no-console-error": "error",
      "myplugin/no-handler-suffix": "error",
    },
  },
]);
