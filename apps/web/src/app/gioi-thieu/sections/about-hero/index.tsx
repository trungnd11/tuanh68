import clsx from "clsx";
import Image from "next/image";
import AppBreadcrumb from "@/shared/ui/app-breadcrumb";
import { aboutHeroContent } from "./content";
import AppContent from "@/shared/ui/app-content";

export default function AboutHeroSection() {
  return (
    <section
      id={aboutHeroContent.id}
      className={clsx("relative -mt-20.5 min-h-170", "overflow-hidden pt-20 text-white")}
    >
      <div className={clsx("absolute inset-0 overflow-clip")}>
        <Image
          src="/assets/about/hero-banner.jpg"
          alt="Nhà máy sản xuất ván ép Tu Anh 68"
          fill
          priority
          className={clsx("object-cover")}
          sizes="100vw"
        />
        <div
          className={clsx("absolute inset-0")}
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
        <div
          className={clsx("absolute inset-0")}
          style={{
            background: "linear-gradient(to top, rgba(41,115,178,0.3) 0%, rgba(41,115,178,0) 60%)",
          }}
        />
      </div>

      <AppContent className={clsx("pt-3.75 grid gap-7")}>
        <AppBreadcrumb
          items={[
            { href: aboutHeroContent.breadcrumb.homeHref, label: aboutHeroContent.breadcrumb.home },
            { href: "#", label: aboutHeroContent.breadcrumb.current },
          ]}
          className={clsx("relative")}
        />

        <div className={clsx("relative flex w-full max-w-7xl lg:px-8")}>
          <div className={clsx("flex w-full max-w-3xl flex-col gap-3 lg:gap-6")}>
            <div className={clsx("flex items-center gap-3")}>
              <div className={clsx("h-0.5 w-12 bg-app-brand-teal")} />
              <span className={clsx("text-sm font-semibold uppercase tracking-[1.4px] text-app-brand-teal")}>
                {aboutHeroContent.badge}
              </span>
            </div>

            <h1
              className={clsx(
                "text-[32px] lg:text-6xl leading-10 lg:leading-15 font-black tracking-[1.5px] uppercase",
                "drop-shadow-[0px_4px_1.5px_rgba(0,0,0,0.1),0px_10px_4px_rgba(0,0,0,0.04)]"
              )}
            >
              {aboutHeroContent.title[0]}
              <br />
              <span className={clsx("text-app-brand-teal")}>{aboutHeroContent.title[1]}</span>
            </h1>

            <p className={clsx("max-w-2xl lg:text-xl font-medium", "leading-7 text-app-neutral-200")}>
              {aboutHeroContent.description[0]}
              <br />
              {aboutHeroContent.description[1]}
              <br />
              {aboutHeroContent.description[2]}
            </p>

            <div className={clsx("grid grid-cols-2 lg:flex w-full flex-wrap", "lg:gap-8")}>
              {aboutHeroContent.stats.slice(0, 3).map((stat, i) => (
                <div key={stat.value} className={clsx("flex items-center gap-8 md:gap-0")}>
                  <div className={clsx("flex flex-col gap-1")}>
                    <span className={clsx("text-center text-4xl font-black leading-10 text-white")}>{stat.value}</span>
                    <span
                      className={clsx(
                        "text-center text-sm font-medium uppercase tracking-[0.35px]",
                        "text-app-brand-teal"
                      )}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <div className={clsx("mx-8 hidden h-16 w-px bg-white/20 md:block")} />
                </div>
              ))}
              <div className={clsx("flex w-full md:w-auto")}>
                <div className={clsx("flex flex-col gap-1")}>
                  <span className={clsx("text-center text-4xl font-black leading-10 text-white md:text-left")}>
                    {aboutHeroContent.stats[3].value}
                  </span>
                  <span
                    className={clsx(
                      "text-center text-sm font-medium uppercase tracking-[0.35px]",
                      "text-app-brand-teal md:text-left"
                    )}
                  >
                    {aboutHeroContent.stats[3].label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppContent>
    </section>
  );
}
