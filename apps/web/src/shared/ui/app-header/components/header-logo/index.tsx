"use client";

import clsx from "clsx";
import Link from "next/link";
import F88Logo from "@/assets/logo/f88-logo.svg";
import { appSectionIds } from "@/shared/config/app";
import type { HeaderLogoProps } from "./types";

export default function HeaderLogo({ className }: HeaderLogoProps) {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Link
      aria-label="F88 IPO"
      href={`#${appSectionIds.banner}`}
      onClick={handleClick}
      className={clsx("inline-flex h-10.5 w-25 shrink-0", className)}
    >
      <F88Logo aria-hidden="true" focusable="false" className="h-full w-full" />
    </Link>
  );
}
