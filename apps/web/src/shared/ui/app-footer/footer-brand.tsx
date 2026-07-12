import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "./content";

export default function FooterBrand() {
  return (
    <div className={clsx("flex w-full flex-col gap-[22.8px] xl:w-[373.33px]")}>
      <div className={clsx("flex items-center")}>
        <Image src={companyInfo.logo} alt="Tú Anh 68" className={clsx("h-[50px] w-auto")} />
      </div>
      <p
        className={clsx(
          "text-[12px] font-normal leading-[20px] text-app-neutral-400 lg:text-[14px] lg:leading-[22.75px]"
        )}
      >
        {companyInfo.description}
      </p>
      <div className={clsx("flex items-center gap-4")}>
        {companyInfo.socials.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className={clsx("flex size-10 items-center justify-center rounded-full", "bg-[rgba(255,255,255,0.1)]")}
          >
            <s.icon className={clsx("size-4 text-white")} />
          </Link>
        ))}
      </div>
    </div>
  );
}
