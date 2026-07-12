import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { quickLinks, ChevronIcon } from "./content";

function QuickLinkItem({ label, href }: { label: string; href: string }) {
  return (
    <div className={clsx("flex w-full items-start pt-[8px] first:pt-0")}>
      <Link href={href} className={clsx("flex items-center gap-[15.5px]")}>
        <ChevronIcon className={clsx("size-[12px] text-app-neutral-300")} />
        <div
          className={clsx(
            "text-[12px] font-normal leading-[18px] text-app-neutral-300 lg:text-[14px] lg:leading-[20px]"
          )}
        >
          {label}
        </div>
      </Link>
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className={clsx("border-b border-app-neutral-600 pb-[9px]")}>
      <h3 className={clsx("text-[16px] font-bold leading-7 text-white uppercase lg:text-[18px] lg:leading-[28px]")}>
        {children}
      </h3>
    </div>
  );
}

export default function FooterLinks() {
  return (
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
  );
}
