import clsx from "clsx";
import { contactFaqContent } from "./content";

export default function ContactFaqHeader() {
  return (
    <div className={clsx("flex flex-col items-center gap-4")}>
      <div className={clsx("flex items-center gap-3")}>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
        <div className={clsx("text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
          {contactFaqContent.badge}
        </div>
        <div className={clsx("h-0.5 w-10 bg-app-brand-teal")} />
      </div>

      <h2 className={clsx("text-center text-[28px] font-black uppercase leading-10 text-[#333] lg:text-[36px]")}>
        {contactFaqContent.heading}{" "}
        <span className={clsx("text-app-accent-blue")}>{contactFaqContent.headingHighlight}</span>
      </h2>

      <p className={clsx("max-w-xl text-center text-sm leading-6 text-[#6b7280] lg:text-base")}>
        {contactFaqContent.subtitle[0]}
        <br />
        {contactFaqContent.subtitle[1]}
      </p>
    </div>
  );
}
