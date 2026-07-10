import clsx from "clsx";
import Image from "next/image";
import { urgentCtaContent } from "./content";

export default function UrgentCtaBackground() {
  return (
    <>
      <div className={clsx("absolute inset-0 opacity-10")}>
        <Image src={urgentCtaContent.backgroundTexture} alt="" fill className={clsx("object-cover")} sizes="100vw" />
      </div>

      <div
        className={clsx("absolute -left-28 -top-28 size-72 rounded-full opacity-15")}
        style={{
          background: "radial-gradient(circle at center, rgba(41,115,178,1) 0%, rgba(41,115,178,0) 70%)",
        }}
      />
      <div
        className={clsx("absolute -bottom-38 -right-38 size-96 rounded-full opacity-15")}
        style={{
          background: "radial-gradient(circle at center, rgba(26,90,138,1) 0%, rgba(26,90,138,0) 70%)",
        }}
      />
    </>
  );
}
