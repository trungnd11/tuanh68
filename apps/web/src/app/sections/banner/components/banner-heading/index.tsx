import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function BannerHeading() {
  const t = useTranslations("HomePage.banner.heading");

  return (
    <>
      <h1
        className={clsx(
          "mt-2 text-[44px] tracking-[0.5px] text-white text-shadow-[0_2px_2px_rgba(0,0,0,0.25)] xl:mt-5.25 xl:text-[68px]",
          "font-extrabold leading-13 xl:leading-19.5"
        )}
      >
        {t("title")}
      </h1>

      <p
        className={clsx(
          "mt-4 hidden text-body-lg-regular leading-8 tracking-[0.07px] text-white/90 xl:mt-5.25 xl:block"
        )}
      >
        {t("description")}
      </p>
    </>
  );
}
