import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AppScrollReveal from "@/shared/ui/app-scroll-reveal";
import { appCtaContent } from "./content";

export default function AppCtaSection() {
  return (
    <section className={clsx("relative overflow-clip bg-[#2973b2] px-[272px] py-[96px]", "max-lg:px-[32px]")}>
      <div className={clsx("pointer-events-none absolute inset-0 opacity-10")}>
        <Image src="/assets/about/cta-bg-texture.jpg" alt="" fill className={clsx("object-cover")} sizes="100vw" />
      </div>

      <div
        className={clsx(
          "pointer-events-none absolute left-[-128px] top-[-128px] size-[256px]",
          "rounded-full opacity-10"
        )}
        style={{
          background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 70%)",
        }}
      />
      <div
        className={clsx(
          "pointer-events-none absolute bottom-[-191.5px] right-[-192px]",
          "size-[384px] rounded-full opacity-10"
        )}
        style={{
          background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 70%)",
        }}
      />

      <div className={clsx("relative z-10 mx-auto flex max-w-[896px] flex-col items-center", "gap-[24px] px-[32px]")}>
        <AppScrollReveal variant="fade-in-up">
          <div className={clsx("flex items-center gap-[12px]")}>
            <div className={clsx("h-[2px] w-[40px] bg-white/40")} />
            <img src="/assets/about/cta-phone-badge.svg" alt="" className={clsx("size-[14px]")} />
            <div className={clsx("h-[2px] w-[40px] bg-white/40")} />
          </div>
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={50}>
          <h2
            className={clsx(
              "text-center text-[48px] font-black leading-[48px] uppercase text-white",
              "max-lg:text-[36px]"
            )}
          >
            <p className={clsx("m-0")}>{appCtaContent.title[0]}</p>
            <p className={clsx("m-0 text-[#9acbd0]")}>{appCtaContent.title[1]}</p>
          </h2>
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={100}>
          <div className={clsx("max-w-[672px] text-center text-[18px] leading-[29.25px] text-[#bfdbfe]")}>
            {appCtaContent.description.map((line, i) => (
              <p key={i} className={clsx("m-0")}>
                {line}
              </p>
            ))}
          </div>
        </AppScrollReveal>

        <AppScrollReveal variant="fade-in-up" delayMs={150}>
          <div className={clsx("flex gap-[16px] pb-[24px] pt-[16px] max-sm:flex-col")}>
            <Link
              href={appCtaContent.buttons[0].href}
              className={clsx(
                "inline-flex items-center gap-[12px] rounded-[8px] bg-white px-[32px]",
                "py-[16px] text-[14px] font-bold uppercase tracking-[0.35px]",
                "text-[#2973b2] no-underline",
                "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
                "transition-shadow",
                "hover:shadow-[0px_25px_30px_-5px_rgba(0,0,0,0.15),0px_10px_12px_-6px_rgba(0,0,0,0.15)]"
              )}
            >
              <img src={appCtaContent.buttons[0].icon} alt="" className={clsx("size-[14px]")} />
              {appCtaContent.buttons[0].text}
            </Link>
            <Link
              href={appCtaContent.buttons[1].href}
              className={clsx(
                "inline-flex items-center gap-[12px] rounded-[8px] border-2 border-white",
                "px-[34px] py-[18px] text-[14px] font-bold uppercase tracking-[0.35px]",
                "text-white no-underline transition-colors hover:bg-white/10"
              )}
            >
              <img src={appCtaContent.buttons[1].icon} alt="" className={clsx("size-[14px]")} />
              {appCtaContent.buttons[1].text}
            </Link>
          </div>
        </AppScrollReveal>

        <div
          className={clsx(
            "flex w-full gap-[32px] border-t border-white/20 pt-[41px]",
            "max-md:flex-col max-md:items-center"
          )}
        >
          {appCtaContent.contacts.map((contact, i) => (
            <AppScrollReveal key={contact.label} variant="fade-in-up" delayMs={250 + i * 100}>
              <div className={clsx("flex items-center gap-[12px]")}>
                <img src={contact.icon} alt="" className={clsx("size-[18px]")} />
                <div className={clsx("flex flex-col")}>
                  <span className={clsx("text-[12px] font-normal uppercase tracking-[0.3px] text-[#bfdbfe]")}>
                    {contact.label}
                  </span>
                  <span className={clsx("text-[16px] font-bold leading-[24px] text-white")}>{contact.value}</span>
                </div>
              </div>
            </AppScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
