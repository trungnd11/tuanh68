import { useTranslations } from "next-intl";
import { getBreakthroughGrowthHeading } from "@/app/sections/f88-breakthrough-growth/data";

export default function BreakthroughGrowthHeading() {
  const t = useTranslations("HomePage.f88BreakthroughGrowth");
  const { subTitle, title, yearTitle, description } = getBreakthroughGrowthHeading(t);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center rounded-full">
        <span className="text-base font-bold uppercase leading-5 text-[#087737]">{subTitle}</span>
      </div>
      <h2 className="text-[40px] font-bold leading-[44px] text-[#030712]">
        <span>{title}</span> <span className="text-[#00844a]">{yearTitle}</span>
      </h2>
      <p className="max-w-[800px] text-base font-medium leading-6 text-[#4a5565]">{description}</p>
    </div>
  );
}
