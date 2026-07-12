import clsx from "clsx";
import Link from "next/link";
import { bottomBar } from "./content";

export default function FooterBottom() {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-between gap-4 border-t",
        "border-[rgba(255,255,255,0.1)] pt-6 lg:pt-[33px] xl:flex-row"
      )}
    >
      <p className={clsx("text-[12px] font-normal leading-[16px] text-app-neutral-400 text-center xl:text-left")}>
        {bottomBar.copyright}
      </p>
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
  );
}
