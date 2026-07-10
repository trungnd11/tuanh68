import clsx from "clsx";
import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import { projectsBannerContent } from "./content";

export default function ProjectsBannerSection() {
  return (
    <section
      className={clsx(
        "relative -mt-20.5 flex min-h-175 items-center justify-center",
        "overflow-hidden pt-20 text-white"
      )}
    >
      <div className={clsx("absolute inset-0 flex flex-col items-start justify-center overflow-clip")}>
        <Image
          src={projectsBannerContent.backgroundImage}
          alt="Công trình xây dựng cao tầng sử dụng ván phủ phim"
          fill
          priority
          className={clsx("object-cover")}
          sizes="100vw"
        />
        <div
          className={clsx(
            "absolute inset-0 bg-linear-to-b from-[rgba(41,115,178,0.8)]",
            "via-[rgba(41,115,178,0.6)] to-[rgba(51,51,51,0.8)]"
          )}
        />
        <div
          className={clsx("absolute inset-0 opacity-10")}
          style={{
            backgroundImage:
              "linear-gradient(59deg, rgba(255,255,255,0.05) 0%, transparent 4.5%), linear-gradient(-59deg, rgba(255,255,255,0.05) 0%, transparent 4.5%)",
          }}
        />
      </div>

      <AppBreadcrumb
        items={[
          { href: projectsBannerContent.breadcrumb.homeHref, label: projectsBannerContent.breadcrumb.home },
          { href: "#", label: projectsBannerContent.breadcrumb.current },
        ]}
        className={clsx("absolute left-20 right-20 top-24 max-lg:left-8 max-lg:right-8")}
      />

      <div className={clsx("relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5", "px-4")}>
        <h1
          className={clsx(
            "w-full text-center text-[60px] font-extrabold uppercase leading-15",
            "tracking-[3px] text-white",
            "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]",
            "max-md:text-[42px] max-md:leading-11"
          )}
        >
          {projectsBannerContent.title}
        </h1>

        <p
          className={clsx(
            "w-full max-w-2xl text-center text-xl font-medium leading-7",
            "tracking-[0.5px] text-[#dbeafe]",
            "drop-shadow-[0px_2px_1px_rgba(0,0,0,0.06),0px_4px_1.5px_rgba(0,0,0,0.07)]"
          )}
        >
          {projectsBannerContent.subtitle[0]}
          <br />
          {projectsBannerContent.subtitle[1]}
        </p>

        <div className={clsx("flex w-full items-center justify-center gap-4 pt-3")}>
          <div className={clsx("h-px w-16 bg-[rgba(72,166,167,0.6)]")} />
          <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.5 0L14.081 7.75H22.5L15.709 12.25L18.291 20L11.5 15.5L4.709 20L7.291 12.25L0.5 7.75H8.919L11.5 0Z"
              fill="#48a6a7"
              fillOpacity="0.6"
            />
          </svg>
          <div className={clsx("h-px w-16 bg-[rgba(72,166,167,0.6)]")} />
        </div>
      </div>
    </section>
  );
}
