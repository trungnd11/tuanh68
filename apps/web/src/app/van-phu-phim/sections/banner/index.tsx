import clsx from "clsx";
import Image from "next/image";
import AppSectionBadge from "@/shared/ui/app-section-badge";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import IconEye from "@/assets/icons/icon-eye.svg";
import IconDocument from "@/assets/icons/icon-document.svg";
import { bannerContent } from "./content";

export default function BannerSection() {
  const firstRowTags = bannerContent.tags.slice(0, 3);
  const secondRowTags = bannerContent.tags.slice(3);

  return (
    <section
      id={bannerContent.id}
      className={clsx(
        "relative -mt-20.5 flex min-h-170 items-center justify-center",
        "overflow-hidden pt-20 text-white"
      )}
    >
      <div className={clsx("absolute inset-0 overflow-clip")}>
        <Image
          src={bannerContent.backgroundImage}
          alt="Ván ép phủ phim trong kho xưởng công nghiệp"
          fill
          priority
          className={clsx("object-cover")}
          sizes="100vw"
        />
        <div
          className={clsx("absolute inset-0")}
          style={{
            background:
              "linear-gradient(135deg, rgba(10,20,40,0.92) 0%, rgba(41,115,178,0.55) 60%, rgba(72,166,167,0.3) 100%)",
          }}
        />
      </div>

      <AppBreadcrumb
        items={[
          { href: bannerContent.breadcrumb.homeHref, label: bannerContent.breadcrumb.home },
          { href: "#", label: bannerContent.breadcrumb.current },
        ]}
        className={clsx("absolute left-20 right-20 top-24 max-lg:left-8 max-lg:right-8")}
      />

      <div className={clsx("relative z-10 mx-auto flex w-full max-w-7xl px-8 max-lg:flex-col", "max-lg:gap-10")}>
        <div className={clsx("flex flex-1 flex-col gap-5")}>
          <AppSectionBadge>{bannerContent.badge}</AppSectionBadge>

          <h1
            className={clsx("text-6xl font-black leading-[60px] uppercase max-md:text-[42px]", "max-md:leading-[44px]")}
          >
            {bannerContent.title[0]}
            <br />
            <span className={clsx("text-app-brand-teal")}>{bannerContent.title[1]}</span>
          </h1>

          <p className={clsx("max-w-[576px] text-lg leading-[29.25px] text-gray-200")}>
            {bannerContent.description[0]}
            <br />
            {bannerContent.description[1]}
            <br />
            {bannerContent.description[2]}
          </p>

          <div className={clsx("relative h-[100px] w-full max-md:h-auto max-md:min-h-[80px]")}>
            <div
              className={clsx(
                "absolute bottom-[50px] left-0 flex items-center gap-2 rounded-full",
                "border border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)]",
                "px-[17px] py-[8.5px] backdrop-blur-[2px] max-md:relative",
                "max-md:bottom-auto max-md:mb-2 max-md:inline-flex"
              )}
            >
              <Image src={firstRowTags[0].icon} alt="" width={15} height={12} className={clsx("h-3 w-[15px]")} />
              <span className={clsx("text-sm font-medium leading-5 text-white")}>{firstRowTags[0].label}</span>
            </div>
            <div
              className={clsx(
                "absolute bottom-[50px] left-[186.52px] flex items-center gap-2",
                "rounded-full border border-[rgba(255,255,255,0.2)]",
                "bg-[rgba(255,255,255,0.1)] px-[17px] py-[8.5px] backdrop-blur-[2px]",
                "max-md:relative max-md:bottom-auto max-md:left-auto max-md:mb-2",
                "max-md:inline-flex"
              )}
            >
              <Image src={firstRowTags[1].icon} alt="" width={12} height={12} className={clsx("size-3")} />
              <span className={clsx("text-sm font-medium leading-5 text-white")}>{firstRowTags[1].label}</span>
            </div>
            <div
              className={clsx(
                "absolute bottom-[50px] left-[387.58px] flex items-center gap-2",
                "rounded-full border border-[rgba(255,255,255,0.2)]",
                "bg-[rgba(255,255,255,0.1)] px-[17px] py-[8.5px] backdrop-blur-[2px]",
                "max-md:relative max-md:bottom-auto max-md:left-auto max-md:mb-2",
                "max-md:inline-flex"
              )}
            >
              <Image src={firstRowTags[2].icon} alt="" width={12} height={12} className={clsx("size-3")} />
              <span className={clsx("text-sm font-medium leading-5 text-white")}>{firstRowTags[2].label}</span>
            </div>
            <div
              className={clsx(
                "absolute bottom-0 left-0 flex items-center gap-2 rounded-full border",
                "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] px-[17px]",
                "py-[8.5px] backdrop-blur-[2px] max-md:relative max-md:bottom-auto",
                "max-md:inline-flex"
              )}
            >
              <Image src={secondRowTags[0].icon} alt="" width={12} height={12} className={clsx("size-3")} />
              <span className={clsx("text-sm font-medium leading-5 text-white")}>{secondRowTags[0].label}</span>
            </div>
          </div>

          <div className={clsx("flex items-center gap-4 pt-5 max-md:flex-col")}>
            <a
              href={bannerContent.buttons.primary.href}
              className={clsx(
                "flex h-[52px] min-h-0 items-center justify-center gap-3 rounded-lg",
                "bg-[#2973b2] px-8 text-sm font-bold uppercase tracking-[0.35px]",
                "text-white",
                "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]",
                "max-md:w-full"
              )}
            >
              <IconEye className={clsx("h-3.5 w-[15.75px] shrink-0")} />
              <span>{bannerContent.buttons.primary.label}</span>
            </a>
            <a
              href={bannerContent.buttons.secondary.href}
              className={clsx(
                "flex h-[52px] min-h-0 items-center justify-center gap-3 rounded-lg",
                "border-2 border-white bg-transparent px-[34px] text-sm font-bold",
                "uppercase tracking-[0.35px] text-white max-md:w-full"
              )}
            >
              <IconDocument className={clsx("h-3.5 w-[10.5px] shrink-0")} />
              <span>{bannerContent.buttons.secondary.label}</span>
            </a>
          </div>
        </div>

        <div
          className={clsx("grid h-[348px] flex-1 grid-cols-2 gap-x-4 gap-y-4 max-lg:h-auto", "max-lg:min-h-[348px]")}
        >
          {bannerContent.statCards.map((card) => (
            <div
              key={card.label}
              className={clsx(
                "flex flex-col items-center gap-1 rounded-2xl border",
                "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.1)] p-[25px]",
                "backdrop-blur-[2px]"
              )}
            >
              <div
                className={clsx("flex size-12 items-center justify-center rounded-full")}
                style={{ background: card.iconBg }}
              >
                <Image src={card.icon} alt="" width={20} height={20} className={clsx("size-5")} />
              </div>
              <div className={clsx("flex w-full flex-col items-center pt-2")}>
                <span className={clsx("text-center text-3xl font-black leading-9 text-white")}>{card.value}</span>
              </div>
              <span
                className={clsx(
                  "w-full text-center text-xs font-semibold uppercase tracking-[0.6px]",
                  "text-app-brand-teal"
                )}
              >
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={clsx("absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center", "gap-2")}>
        <span className={clsx("text-xs font-normal uppercase tracking-[1.2px]", "text-[rgba(255,255,255,0.4)]")}>
          {bannerContent.scrollDown}
        </span>
        <Image src="/assets/products/hero/chevron-down.png" alt="" width={12} height={12} className={clsx("size-3")} />
      </div>
    </section>
  );
}
