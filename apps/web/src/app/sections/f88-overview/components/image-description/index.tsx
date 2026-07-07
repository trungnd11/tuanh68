import clsx from "clsx";
import Image from "next/image";
import F88Overview1 from "@/assets/images/f88-overview-1.png";
import F88Overview2 from "@/assets/images/f88-overview-2.png";
import F88Overview3 from "@/assets/images/f88-overview-3.png";
import AppBorderRadius from "@/shared/ui/app-border-radius";

export default function ImageDescription() {
  return (
    <div className={clsx("order-1 grid gap-2 xl:order-2")}>
      <AppBorderRadius cornerRadius={12}>
        <Image src={F88Overview1} alt="F88 Overview 1" className={clsx("h-41.25 w-full object-cover xl:h-56")} />
      </AppBorderRadius>
      <div className={clsx("grid grid-cols-[247px_1fr] gap-2 xl:grid-cols-[280px_1fr] xl:gap-2.5")}>
        <AppBorderRadius cornerRadius={12}>
          <Image src={F88Overview2} alt="F88 Overview 2" className={clsx("h-35.75 w-full object-cover xl:h-40.75")} />
        </AppBorderRadius>
        <AppBorderRadius cornerRadius={12}>
          <Image src={F88Overview3} alt="F88 Overview 3" className={clsx("h-35.75 w-full object-cover xl:h-40.75")} />
        </AppBorderRadius>
      </div>
    </div>
  );
}
