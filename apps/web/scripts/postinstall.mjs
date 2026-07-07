import { spawnSync } from "node:child_process";

if (process.env.SKIP_CODEARTIFACT_LOGIN === "1") {
  process.exit(0);
}

const loginCommand =
  "aws codeartifact login --tool npm --domain f88 --domain-owner 912031117632 --repository F88.NodeModules";
const resetRegistryCommand = "npm config set registry https://registry.npmjs.org";

const result = spawnSync(`${loginCommand} && ${resetRegistryCommand}`, {
  stdio: "inherit",
  shell: true,
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
