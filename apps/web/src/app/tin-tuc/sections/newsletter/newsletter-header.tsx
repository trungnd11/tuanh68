import clsx from "clsx";
import { newsletterContent } from "./content";

export default function NewsletterHeader() {
  return (
    <div className={clsx("flex flex-1 flex-col gap-3")}>
      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
        <div
          className={clsx("text-[12px] font-semibold uppercase tracking-[1.4px] text-app-brand-teal lg:text-[14px]")}
        >
          {newsletterContent.badge}
        </div>
      </div>

      <h2
        className={clsx(
          "pt-1 text-[24px] font-black uppercase leading-[32px] text-white lg:text-[30px] lg:leading-[36px]"
        )}
      >
        {newsletterContent.titleBefore}
        <span className={clsx("text-app-brand-teal")}>{newsletterContent.titleAccent}</span>
        {newsletterContent.titleAfter}
      </h2>

      <p className={clsx("max-w-[448px] text-sm leading-[22.75px] text-[#9ca3af] lg:text-[14px]")}>
        {newsletterContent.description[0]}
        <br />
        {newsletterContent.description[1]}
        <br />
        {newsletterContent.description[2]}
      </p>
    </div>
  );
}
