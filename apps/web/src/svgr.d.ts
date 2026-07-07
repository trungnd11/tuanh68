declare module "*.svg?raw" {
  const content: string;

  export default content;
}

declare module "*.svg" {
  import type { FC, SVGProps } from "react";

  const content: FC<SVGProps<SVGSVGElement>>;

  export default content;
}
