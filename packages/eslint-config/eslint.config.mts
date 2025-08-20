import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dragonswap from "eslint-plugin-dragonswap";

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
      "max-lines": ["error", 500],
    },
  },

  {
    plugins: {
      // @ts-expect-error ---
      dragonswap,
    },
    rules: {
      "dragonswap/no-console-error": "error",
      "dragonswap/no-handler-suffix": "error",
      "dragonswap/prefer-react-with-hooks": "error",
      "dragonswap/prefer-arrow-functions": "error",
      "dragonswap/boolean-naming-convention": "warn",
      "dragonswap/prefer-object-as-args": ["error", { ignore: ["e", "event"] }],
    },
  },
]);
