import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  reactHooks.configs["recommended-latest"],
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
  },
  ...pluginQuery.configs["flat/recommended"],
  pluginPrettier,
]);
