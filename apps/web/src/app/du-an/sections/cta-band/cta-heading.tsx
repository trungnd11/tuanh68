import clsx from "clsx";
import { ctaBandContent } from "./content";

export default function CtaHeading() {
  return (
    <>
      <h2
        className={clsx(
          "w-full text-center text-2xl font-extrabold uppercase leading-10 lg:text-4xl",
          "tracking-[0.9px] text-[#333]"
        )}
      >
        {ctaBandContent.title}
      </h2>

      <p
        className={clsx(
          "w-full max-w-[576px] text-center text-sm font-normal leading-[26px] lg:text-base",
          "text-gray-500"
        )}
      >
        {ctaBandContent.description[0]}
        <br />
        {ctaBandContent.description[1]}
      </p>
    </>
  );
}
