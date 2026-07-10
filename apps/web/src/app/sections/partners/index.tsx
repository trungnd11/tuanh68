"use client";

import Image from "next/image";
import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppResponsiveTimeline from "@/shared/ui/app-responsive-timeline";
import AppResponsiveTimelineNav from "@/shared/ui/app-responsive-timeline/nav";
import { partnersContent } from "./content";
import AppButton from "@/shared/ui/app-button";
import Link from "next/link";
import { appColors } from "@/shared/theme";

function PartnerCard({ name, image, width, height }: { name: string; image: string; width: number; height: number }) {
  return (
    <div className={clsx("flex w-full flex-col items-center gap-2 p-4 opacity-60")}>
      <div className={clsx("flex items-center justify-center")}>
        <Image src={image} alt={name} width={width} height={height} />
      </div>
      <span className={clsx("text-center text-[14px] leading-5 font-bold text-[#333]")}>{name}</span>
    </div>
  );
}

export default function PartnersSection() {
  const { items } = partnersContent;

  return (
    <section
      id={partnersContent.id}
      className={clsx("border-t border-app-neutral-200 bg-app-neutral-50 py-6 lg:py-14")}
    >
      <AppContainer className={clsx("px-0!")}>
        <div className={clsx("flex flex-col items-center gap-5 xl:gap-12")}>
          <AppSectionHeading showDivider={false}>{partnersContent.title}</AppSectionHeading>

          <div className={clsx("w-full")}>
            <AppResponsiveTimeline
              totalItems={items.length}
              mobileClassName="flex flex-col gap-4"
              navPosition="top"
              renderTrack={({ handleTrackScroll, trackRef }) => (
                <div
                  ref={trackRef}
                  onScroll={handleTrackScroll}
                  className={clsx(
                    "flex overflow-x-auto scroll-smooth snap-x snap-proximity",
                    "scroll-px-4",
                    "scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  )}
                >
                  {items.map((partner, index) => (
                    <div
                      key={partner.name}
                      className={clsx(index === 0 ? "ml-4" : "ml-0", "flex w-35 shrink-0 snap-center pr-4")}
                    >
                      <PartnerCard {...partner} />
                    </div>
                  ))}
                </div>
              )}
              renderNav={({ currentIndex, handleNext, handlePrev, totalItems }) => (
                <AppResponsiveTimelineNav
                  showDivider
                  currentIndex={currentIndex}
                  totalItems={totalItems}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  counter={`${currentIndex + 1}/${totalItems}`}
                  prevLabel="Trước"
                  nextLabel="Sau"
                />
              )}
              renderDesktop={() => (
                <div className={clsx("grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5")}>
                  {items.map((partner) => (
                    <PartnerCard key={partner.name} {...partner} />
                  ))}
                </div>
              )}
            />
          </div>

          <AppButton
            cornerRadius={50}
            borderRadiusProps={{
              borderWidth: 1,
              borderColor: appColors.appAccentBlue,
              classNameBorder: clsx("bg-white"),
            }}
            className={clsx("w-53.25 h-10 text-app-accent-blue text-sm font-bold leading-5")}
          >
            <Link href={partnersContent.ctaHref}>{partnersContent.cta}</Link>
          </AppButton>
        </div>
      </AppContainer>
    </section>
  );
}
