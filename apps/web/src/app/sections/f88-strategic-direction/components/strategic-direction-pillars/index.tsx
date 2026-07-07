import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import MissionIcon from "@/assets/icons/mission.svg";
import VisionIcon from "@/assets/icons/vision.svg";
import { getStrategicPillars } from "@/app/sections/f88-strategic-direction/data";
import { appColors } from "@/shared/theme";

const iconMap = {
  vision: VisionIcon,
  mission: MissionIcon,
};

export default function StrategicDirectionPillars() {
  const t = useTranslations("HomePage.f88StrategicDirection");
  const strategicPillars = getStrategicPillars(t);

  return (
    <div className={clsx("grid gap-3 xl:gap-6 md:grid-cols-2")}>
      {strategicPillars.map((item) => {
        const Icon = iconMap[item.icon];
        const isPrimary = item.tone === "primary";

        return (
          <AppBorderRadius
            key={item.label}
            cornerRadius={16}
            {...(!isPrimary
              ? {
                  borderWidth: 1,
                  borderColor: appColors.appNeutral[300],
                  classNameBorder: clsx("h-full bg-white"),
                }
              : {})}
          >
            <article
              className={clsx(
                "flex flex-col gap-4 xl:gap-5",
                isPrimary ? "px-5 py-6 xl:px-8 xl:py-10" : "px-4.75 py-5.75 xl:px-7.75 xl:py-9.75",
                isPrimary ? "bg-app-primary-550 text-white" : "bg-white text-app-neutral-950"
              )}
            >
              <AppBorderRadius cornerRadius={16} classNameContainer={clsx("hidden xl:inline-flex")}>
                <div
                  className={clsx(
                    "p-5 items-center justify-center",
                    isPrimary ? "bg-app-primary-500 text-white" : "bg-app-primary-100 text-app-primary-500"
                  )}
                >
                  <Icon className="size-6" />
                </div>
              </AppBorderRadius>

              <div className="flex flex-col gap-2">
                <p
                  className={clsx(
                    "text-body-base-bold uppercase leading-5",
                    isPrimary ? "text-main-app-yellow" : "text-app-primary-550"
                  )}
                >
                  {item.label}
                </p>
                <h3 className={clsx("text-heading-base-bold", isPrimary ? "text-white" : "text-app-neutral-950")}>
                  {item.title}
                </h3>
              </div>

              <p className={clsx("text-body-base-regular", isPrimary ? "text-white" : "text-app-neutral-950")}>
                {item.description}
              </p>
            </article>
          </AppBorderRadius>
        );
      })}
    </div>
  );
}
