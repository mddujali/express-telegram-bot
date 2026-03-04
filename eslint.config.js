import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import globals from 'globals';

export default [
  // Ignore build output, dependencies, etc.
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Your project rules + Prettier integration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        // Uses your tsconfig.json for type-aware parsing when needed
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Disable conflicting formatting rules (must be last)
  eslintConfigPrettier,

  // Lint Node-run config files with Node globals (process, __dirname, etc.)
  {
    files: ['ray.config.js', '*.config.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
];
