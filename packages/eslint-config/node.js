import globals from "globals";
import { baseConfig } from "./base.js";

export const nodeConfig = [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
