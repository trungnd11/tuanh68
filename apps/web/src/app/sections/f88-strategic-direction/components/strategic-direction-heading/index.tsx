import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppPageTitle from "@/shared/ui/app-page-title";
import { getStrategicDirectionHero } from "@/app/sections/f88-strategic-direction/data";
import AppPageSubTitle from "@/shared/ui/app-page-sub-title";

export default function StrategicDirectionHeading() {
  const t = useTranslations("HomePage.f88StrategicDirection");
  const strategicDirectionHero = getStrategicDirectionHero(t);

  return (
    <div className={clsx("mx-auto flex flex-col items-center gap-3 text-center")}>
      <AppPageSubTitle>{strategicDirectionHero.eyebrow}</AppPageSubTitle>
      <AppPageTitle className={clsx("tracking-[0.15px]")}>{strategicDirectionHero.title}</AppPageTitle>
    </div>
  );
}
