import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const standaloneRoot = join(projectRoot, ".next", "standalone");
const standaloneNextRoot = join(standaloneRoot, ".next");

const copyTargets = [
  {
    source: join(projectRoot, "public"),
    destination: join(standaloneRoot, "public"),
  },
  {
    source: join(projectRoot, ".next", "static"),
    destination: join(standaloneNextRoot, "static"),
  },
];

mkdirSync(standaloneNextRoot, { recursive: true });

for (const { source, destination } of copyTargets) {
  if (!existsSync(source)) {
    continue;
  }

  cpSync(source, destination, {
    force: true,
    recursive: true,
  });
}
