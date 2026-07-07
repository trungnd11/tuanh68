import type { NextConfig } from "next";

type SvgRule = {
  issuer?: unknown;
  exclude?: RegExp;
  test?: RegExp;
} & Record<string, unknown>;

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  turbopack: {
    rules: {
      "*": [
        {
          condition: {
            all: [{ path: "*.svg" }, { query: /raw/ }],
          },
          type: "raw",
        },
        {
          condition: {
            all: [
              { path: "*.svg" },
              {
                not: {
                  any: [{ query: /raw/ }, { query: /url/ }],
                },
              },
            ],
          },
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      ],
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: unknown): rule is SvgRule =>
        typeof rule === "object" &&
        rule !== null &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
    );

    if (fileLoaderRule && typeof fileLoaderRule === "object") {
      config.module.rules.push(
        {
          test: /\.svg$/i,
          resourceQuery: /raw/,
          type: "asset/source",
        },
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [/raw/, /url/] },
          use: ["@svgr/webpack"],
        }
      );

      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
