import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "out/**/*",
      "build/**/*",
      "next-env.d.ts",
      "ml-models/**/*",
      "*.pkl",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-undef": "warn",
      "no-empty": "warn",
      "no-prototype-builtins": "warn",
      "no-cond-assign": "warn",
      "no-self-assign": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  },
];
