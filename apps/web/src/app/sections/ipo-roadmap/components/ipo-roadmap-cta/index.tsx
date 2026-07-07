"use client";

import clsx from "clsx";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import AppButton from "@/shared/ui/app-button";
import { scrollToPurchaseForm } from "@/shared/utils/scroll";

export default function IpoRoadmapCta() {
  return (
    <AppBorderRadius
      asChild
      borderColor="rgba(0,132,74,0.50)"
      borderWidth={1}
      cornerRadius={16}
      classNameBorder={clsx(" h-full bg-app-primary-25")}
      classNameContainer={clsx("px-4 xl:px-0")}
    >
      <div className={clsx("flex flex-col gap-4 px-2.75 py-5.75 xl:px-7.75 xl:py-8.75")}>
        <div className={clsx("flex flex-col items-center xl:items-start gap-2")}>
          <h3 className="text-sm font-bold leading-5 text-app-neutral-950">Bạn đã sẵn sàng?</h3>
          <p className="text-lg font-semibold leading-5.5 text-app-primary-500">
            Đăng ký mua cổ phiếu F88 ngay hôm nay
          </p>
        </div>

        <div className="flex items-center gap-5">
          <AppButton
            cornerRadius={8}
            borderRadiusProps={{
              classNameContainer: clsx("flex-1 xl:flex-none", "drop-shadow-[0_1px_1px_rgba(87,87,87,0.50)]"),
            }}
            className={clsx("h-12 xl:h-13 w-full bg-main-app-yellow font-semibold text-base xl:w-55")}
            onClick={scrollToPurchaseForm}
          >
            Đăng ký ngay
          </AppButton>
        </div>
      </div>
    </AppBorderRadius>
  );
}
