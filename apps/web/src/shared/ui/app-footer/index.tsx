import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { companyInfo, contactInfo, quickLinks, bottomBar, ChevronIcon } from "./content";

function SectionHeading({ children }: { children: string }) {
  return (
    <div className={clsx("border-b border-app-neutral-600 pb-[9px]")}>
      <h3 className={clsx("text-[18px] font-bold leading-[28px] text-white uppercase")}>{children}</h3>
    </div>
  );
}

function ContactItem({ icon: Icon, text }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string | string[] }) {
  return (
    <div className={clsx("flex gap-3")}>
      <Icon className={clsx("mt-[6px] size-[14px] shrink-0 text-app-neutral-300")} />
      <div>
        {Array.isArray(text) ? (
          text.map((line, i) => (
            <p key={i} className={clsx("text-[14px] font-normal leading-[20px] text-app-neutral-300")}>
              {line}
            </p>
          ))
        ) : (
          <p className={clsx("text-[14px] font-normal leading-[20px] text-app-neutral-300")}>{text}</p>
        )}
      </div>
    </div>
  );
}

function QuickLinkItem({ label, href }: { label: string; href: string }) {
  return (
    <div className={clsx("flex w-full items-start pt-[8px] first:pt-0")}>
      <Link href={href} className={clsx("flex items-center gap-[15.5px]")}>
        <ChevronIcon className={clsx("size-[12px] text-app-neutral-300")} />
        <span className={clsx("text-[14px] font-normal leading-[20px] text-app-neutral-300")}>{label}</span>
      </Link>
    </div>
  );
}

export default function AppFooter() {
  return (
    <footer className={clsx("border-t-6 border-app-accent-blue bg-app-dark")}>
      <div className={clsx("mx-auto flex max-w-[1280px] flex-col gap-12 px-8 pt-[70px] pb-8")}>
        <div className={clsx("flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-center")}>
          <div className={clsx("flex w-full flex-col gap-[22.8px] xl:w-[373.33px]")}>
            <div className={clsx("flex items-center")}>
              <Image src={companyInfo.logo} alt="Tú Anh 68" className={clsx("h-[50px] w-auto")} />
            </div>
            <p className={clsx("text-[14px] font-normal leading-[22.75px] text-app-neutral-400")}>
              {companyInfo.description}
            </p>
            <div className={clsx("flex items-center gap-4")}>
              {companyInfo.socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={clsx(
                    "flex size-10 items-center justify-center rounded-full",
                    "bg-[rgba(255,255,255,0.1)]"
                  )}
                >
                  <s.icon className={clsx("size-4 text-white")} />
                </Link>
              ))}
            </div>
          </div>

          <div className={clsx("flex w-full flex-col gap-6 xl:w-[373.33px]")}>
            <SectionHeading>{contactInfo.heading}</SectionHeading>
            <div className={clsx("flex w-full flex-col gap-[15.5px]")}>
              {contactInfo.items.map((item) => (
                <ContactItem key={item.text.toString()} icon={item.icon} text={item.text} />
              ))}
            </div>
          </div>

          <div className={clsx("flex w-full flex-col gap-6 xl:w-[373.34px]")}>
            <SectionHeading>{quickLinks.heading}</SectionHeading>
            <div className={clsx("flex w-full flex-col")}>
              {quickLinks.items.map((item) => (
                <QuickLinkItem key={item.label} label={item.label} href={item.href} />
              ))}
            </div>
            <div className={clsx("w-fit rounded bg-white p-2")}>
              <Image src={quickLinks.bctLogo} alt="Bộ Công Thương" className={clsx("h-10 w-32 object-contain")} />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-col items-center justify-between gap-4 border-t",
            "border-[rgba(255,255,255,0.1)] pt-[33px] xl:flex-row"
          )}
        >
          <p className={clsx("text-[12px] font-normal leading-[16px] text-app-neutral-400")}>{bottomBar.copyright}</p>
          <div className={clsx("flex gap-4")}>
            {bottomBar.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx("text-[12px] font-normal leading-[16px] text-app-neutral-400", "hover:text-white")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
