import clsx from "clsx";
import IconColumnBeam from "@/assets/icons/icon-column-beam.svg";
import IconFloorSlab from "@/assets/icons/icon-floor-slab.svg";
import IconHighRise from "@/assets/icons/icon-high-rise.svg";
import IconBridge from "@/assets/icons/icon-bridge.svg";

export const applicationIconMap = {
  "column-beam": <IconColumnBeam className={clsx("text-white")} />,
  "floor-slab": <IconFloorSlab className={clsx("text-white")} />,
  "high-rise": <IconHighRise className={clsx("text-white")} />,
  bridge: <IconBridge className={clsx("text-white")} />,
} as const;
