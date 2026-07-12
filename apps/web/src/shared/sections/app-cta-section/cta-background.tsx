import clsx from "clsx";
import Image from "next/image";

export default function CtaBackground() {
  return (
    <>
      <div className={clsx("pointer-events-none absolute inset-0 opacity-10")}>
        <Image src="/assets/about/cta-bg-texture.jpg" alt="" fill className={clsx("object-cover")} sizes="100vw" />
      </div>
      <div
        className={clsx(
          "pointer-events-none absolute left-[-128px] top-[-128px] size-[256px]",
          "rounded-full opacity-10"
        )}
        style={{ background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 70%)" }}
      />
      <div
        className={clsx(
          "pointer-events-none absolute bottom-[-191.5px] right-[-192px]",
          "size-[384px] rounded-full opacity-10"
        )}
        style={{ background: "radial-gradient(circle, rgba(72,166,167,1) 0%, rgba(72,166,167,0) 70%)" }}
      />
    </>
  );
}
