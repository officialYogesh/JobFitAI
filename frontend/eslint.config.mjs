import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // Ignore unused function arguments that start with _
          varsIgnorePattern: "^_", // Ignore unused variables that start with _
          caughtErrorsIgnorePattern: "^_", // Ignore unused catch clause parameters that start with _
          ignoreRestSiblings: true, // Ignore unused properties when using object destructuring
        },
      ],
    },
  },
];

export default eslintConfig;
