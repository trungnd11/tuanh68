import clsx from "clsx";
import IconCall from "@/assets/icons/call.svg";
import IconMail from "@/assets/icons/mail.svg";
import IconMapPin from "@/assets/icons/icon-map-pin.svg";

export const urgentCtaContactIconMap = {
  phone: <IconCall className={clsx("text-white")} />,
  mail: <IconMail className={clsx("text-white")} />,
  map: <IconMapPin className={clsx("text-white")} />,
} as const;
