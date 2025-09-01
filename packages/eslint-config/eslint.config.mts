import { defineConfig } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import nima from "eslint-plugin-nima";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

const __dirname = dirname(fileURLToPath(import.meta.url)),
  MAX_LINES = 500;

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  {
    plugins: {
      // @ts-expect-error ----------
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },

  // @ts-expect-error ----------
  tseslint.configs.strict,
  js.configs.recommended,

  {
    files: ["**/*"],
    plugins: {
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "max-lines": ["error", MAX_LINES],
      "@typescript-eslint/no-deprecated": "error",
      // "one-var": "error",
    },
  },

  {
    files: ["**/src/**/*.{js,ts,mjs,mts,jsx,tsx}"],
    // @ts-expect-error ----------
    plugins: { nima },
    rules: {
      "nima/no-objects-in-deps": "error",
      "nima/prefer-arrow-functions": "error",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
        },

        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },

        {
          selector: "import",
          format: null,
        },

        {
          selector: "objectLiteralProperty",
          format: null,
        },

        {
          selector: "parameter",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },

        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],
      "nima/boolean-naming-convention": [
        "warn",
        {
          allowedPrefixes: ["is", "has", "was", "will", "should", "amar"],
          checkProperties: false,
        },
      ],
      "nima/params-naming-convention": [
        "error",
        {
          ignore: ["e", "event", "state", "action", "_"],
          ignorePrefixes: ["$", "_"],
          ignoreFunctions: ["map", "reduce", "amar", "globalFilterFn"],
        },
      ],
      "nima/restrict-console-methods": [
        "error",
        {
          allowConsoleError: false,
          allowConsoleLog: true,
          allowConsoleWarn: true,
        },
      ],
      // "no-console": ["error", { allow: ["warn", "error"] }],
      "nima/restrict-function-usage": [
        "error",
        [
          {
            disableFunctions: ["amar", "union", "literal", "optional"],
            folders: ["**/routes/**", "**/routes"],
            files: ["index.tsx"],
          },
          {
            disableFunctions: ["nima"],
            folders: ["/routes/"],
          },
          {
            allowFunctions: ["useParams"],
            files: ["*Page.tsx"],
          },
          {
            disableFunctions: ["amar"],
            folders: ["**/hooks"],
            files: ["useApproval.ts"],
          },
          {
            allowFunctions: ["useChains"],
            folders: ["**/components/molecules", "**/components/molecules/**"],
          },
          {
            disableFunctions: ["formatInputNumber"],
            files: ["slice.ts"],
          },
        ],
      ],
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-invalid-void-type": "error",
      "@typescript-eslint/no-loop-func": "error",

      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-misused-spread": "error",
      "typescript-eslint/prefer-readonly-parameter-types": "off",

      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",

      "@typescript-eslint/no-explicit-any": "error",

      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",

      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/non-nullable-type-assertion-style": "error",

      "prefer-destructuring": "off",
      "@typescript-eslint/prefer-destructuring": "error",

      "@typescript-eslint/prefer-find": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "error",
      "@typescript-eslint/prefer-reduce-type-parameter": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
    },
  },
]);
