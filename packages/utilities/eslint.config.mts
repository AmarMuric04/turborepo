import globals from "globals";
import { defineConfig } from "eslint/config";
import defaultConfig from "eslint-configuration";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...defaultConfig,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
]);
