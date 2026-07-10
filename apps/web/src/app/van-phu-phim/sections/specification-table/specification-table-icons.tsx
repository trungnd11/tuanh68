import clsx from "clsx";
import IconRuler from "@/assets/icons/icon-ruler.svg";
import IconSize from "@/assets/icons/icon-size.svg";
import IconWood from "@/assets/icons/icon-wood.svg";
import IconGlue from "@/assets/icons/icon-glue.svg";
import IconFilm from "@/assets/icons/icon-film.svg";
import IconWeight from "@/assets/icons/icon-weight.svg";
import IconLayers from "@/assets/icons/icon-layers.svg";
import IconDensity from "@/assets/icons/icon-density.svg";
import IconCycle from "@/assets/icons/icon-cycle.svg";
import IconTemperature from "@/assets/icons/icon-temperature.svg";
import IconCertificate from "@/assets/icons/icon-certificate.svg";

const iconMap = {
  ruler: <IconRuler className={clsx("size-3.5")} />,
  size: <IconSize className={clsx("size-3.5")} />,
  wood: <IconWood className={clsx("size-3.5")} />,
  glue: <IconGlue className={clsx("size-3.5")} />,
  film: <IconFilm className={clsx("size-3.5")} />,
  weight: <IconWeight className={clsx("size-3.5")} />,
  layers: <IconLayers className={clsx("size-3.5")} />,
  density: <IconDensity className={clsx("size-3.5")} />,
  cycle: <IconCycle className={clsx("size-3.5")} />,
  temperature: <IconTemperature className={clsx("size-3.5")} />,
  certificate: <IconCertificate className={clsx("size-3.5")} />,
} as const;

export function getSpecificationTableIcon(iconKey: keyof typeof iconMap) {
  return iconMap[iconKey];
}
