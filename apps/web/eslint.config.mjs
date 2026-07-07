import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const prettierRules = {
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  printWidth: 120,
  endOfLine: "lf",
  jsxSingleQuote: false,
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    files: ["src/shared/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app",
                "@/app/*",
                "src/app",
                "src/app/*",
                "../app",
                "../app/*",
                "../../app",
                "../../app/*",
                "../../../app",
                "../../../app/*",
                "../../../../app",
                "../../../../app/*",
              ],
              message:
                "Shared modules must not import from app. Move shared logic out of app or invert the dependency.",
            },
          ],
        },
      ],
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": ["error", prettierRules],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
