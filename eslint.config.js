import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.{ts,tsx}"],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    "no-unused-vars": "off", // TypeScript handles this
    "@typescript-eslint/no-unused-vars": "error",
  },
});
