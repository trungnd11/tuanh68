import clsx from "clsx";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { appCtaContent } from "./content";

export default function CtaContacts() {
  return (
    <div className={clsx("flex w-full gap-8 border-t border-white/20 pt-10", "max-md:flex-col max-md:items-center")}>
      {appCtaContent.contacts.map((contact, i) => (
        <AppScrollReveal key={contact.label} variant="fade-in-up" delayMs={250 + i * 100}>
          <div className={clsx("flex items-center gap-3")}>
            <img src={contact.icon} alt="" className={clsx("size-[18px]")} />
            <div className={clsx("flex flex-col")}>
              <div className={clsx("text-[12px] font-normal uppercase tracking-[0.3px] text-[#bfdbfe]")}>
                {contact.label}
              </div>
              <div className={clsx("text-[16px] font-bold leading-6 text-white")}>{contact.value}</div>
            </div>
          </div>
        </AppScrollReveal>
      ))}
    </div>
  );
}
