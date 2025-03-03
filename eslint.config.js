import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImportX from "eslint-plugin-import-x";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export default tseslint.config(
  {
    name: "my-custom-eslint/ignore-dist-folders",
    ignores: ["dist", "public"],
  },
  {
    name: "my-custom-eslint/recommended-js",
    files: ["challenges/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
    },
  },
  {
    name: "my-custom-eslint/recommended-ts",
    files: ["challenges/**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      eslintPluginImportX.flatConfigs.typescript,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: false,
        },
      ],
    },
  },
  {
    name: "my-custom-eslint/recommended-import-x",
    files: ["challenges/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [eslintPluginImportX.flatConfigs.recommended],
    settings: {
      /*"import-x/resolver": {
        typescript: true,
        node: true,
      },*/
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          // use an array of glob patterns
          project: ["tsconfig.app.json"],
        }),
      ],
    },
    rules: {
      // "import-x/no-unresolved": "off",
      "import-x/no-cycle": ["error", { maxDepth: 3 }],
      "import-x/no-restricted-paths": [
        "error",
        {
          basePath: "src/",
          zones: [
            // Previous restrictions...

            // enforce unidirectional codebase:
            // e.g. src/app can import from src/features but not the other way around
            {
              target: "features",
              from: ["app", "features"],
            },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              target: "shared",
              from: ["features", "app"],
            },
          ],
        },
      ],
    },
  },
  {
    name: "my-custom-eslint/recommended-react-and-jsx",
    files: ["challenges/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
    },
  },
  {
    name: "my-custom-eslint/eslint-config-prettier",
    files: ["challenges/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    extends: [eslintConfigPrettier],
  }
);
