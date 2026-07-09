"use client";

import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import LogoImg from "@/assets/footer/logo.png";
import type { HeaderLogoProps } from "./types";

export default function HeaderLogo({ className }: HeaderLogoProps) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link aria-label="Tú Anh 68" href="/" onClick={handleClick} className={clsx("flex items-center", className)}>
      <Image src={LogoImg} alt="Tú Anh 68" width={210} height={60} />
    </Link>
  );
}
