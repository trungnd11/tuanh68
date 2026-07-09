"use client";

import clsx from "clsx";
import Image from "next/image";

export default function HeaderActions() {
  return (
    <a
      href="tel:0983570760"
      className={clsx(
        "inline-flex items-center gap-2 rounded-[6px] bg-app-brand-teal px-[20px] py-[8px]",
        "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      )}
    >
      <Image src="/assets/header/phone-icon.png" alt="" width={14} height={14} className="size-[14px]" />
      <span className="text-[14px] font-bold leading-[20px] text-white">0983 570 760</span>
    </a>
  );
}
