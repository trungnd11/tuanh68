import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { getStrategicValues } from "@/app/sections/f88-strategic-direction/data";
import { appColors } from "@/shared/theme";
import CoreValue1 from "@/assets/icons/core-value-1.svg";
import CoreValue2 from "@/assets/icons/core-value-2.svg";
import CoreValue3 from "@/assets/icons/core-value-3.svg";
import CoreValue4 from "@/assets/icons/core-value-4.svg";

const coreValueIcons = [CoreValue1, CoreValue2, CoreValue3, CoreValue4];

export default function StrategicDirectionValues() {
  const t = useTranslations("HomePage.f88StrategicDirection");
  const strategicValues = getStrategicValues(t);

  return (
    <AppBorderRadius cornerRadius={16} borderWidth={1} borderColor={appColors.appNeutral[300]}>
      <article className={clsx("bg-white px-4 xl:px-7.75 pt-8.75 pb-7.25", "flex flex-col justify-center gap-8")}>
        <div className="mx-auto flex flex-col items-center gap-2 text-center">
          <p className="text-body-base-bold uppercase text-app-primary-550 leading-5">{strategicValues.eyebrow}</p>
          <h3 className="hidden xl:block text-heading-base-bold text-app-neutral-950">{strategicValues.title}</h3>
          <h3 className="xl:hidden text-heading-base-bold text-app-neutral-950">{strategicValues.title}</h3>
        </div>

        <div
          className={clsx(
            "grid grid-cols-2 xl:mx-auto xl:max-w-216.5 xl:flex",
            "xl:justify-center gap-x-5 gap-y-8 xl:gap-x-0 xl:gap-y-0",
            "xl:min-h-73.75"
          )}
        >
          {strategicValues.items.map((item, index) => {
            const Icon = coreValueIcons[index];

            return (
              <div key={item.title} className="flex min-w-0 flex-col items-center gap-2 text-center xl:gap-5">
                <div className="flex w-full justify-center">
                  <div className="w-full xl:max-w-none">
                    <Icon className="mx-auto h-auto w-full" aria-label={item.title} />
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1 text-app-primary-500">
                  <p className={clsx("text-body-lg-bold leading-5.25 text-lg font-black uppercase xl:text-xl")}>
                    {item.title}
                  </p>
                  <p className="text-body-sm-bold text-xs leading-4 font-extrabold uppercase xl:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </AppBorderRadius>
  );
}
