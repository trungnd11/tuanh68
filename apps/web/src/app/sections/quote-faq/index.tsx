"use client";

import clsx from "clsx";
import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppSubTitleHeading from "@/shared/ui/app-sub-title-heading";
import AppButton from "@/shared/ui/app-button";
import AppCollapse from "@/shared/ui/app-collapse";
import AppQuoteForm from "@/shared/ui/app-quote-form";
import IconSend from "@/assets/icons/icon-send.svg";
import IconPhone from "@/assets/icons/icon-phone.svg";
import { quoteFaqContent } from "./content";
import Link from "next/link";

export default function QuoteFaqSection() {
  return (
    <section id={quoteFaqContent.id} className={clsx("bg-white py-6 lg:py-14")}>
      <AppContainer className={clsx("flex flex-col gap-5 lg:gap-16")}>
        <div className={clsx("flex flex-col items-center gap-2 lg:gap-4")}>
          <AppSectionHeading showDivider={false}>{quoteFaqContent.heading}</AppSectionHeading>
          <p className={clsx("text-center text-sm lg:text-base leading-6 text-[#4b5563]")}>
            {quoteFaqContent.subtitle}
          </p>
          <AppButton
            cornerRadius={50}
            className={clsx(
              "inline-flex items-center gap-2",
              "bg-app-brand-teal px-8 py-3",
              "text-lg leading-7 font-bold text-white",
              "shadow-lg transition-opacity hover:opacity-90"
            )}
          >
            <IconPhone className={clsx("size-4 shrink-0")} />
            <Link href={`tel:${quoteFaqContent.phone.replace(/\s/g, "")}`}>{quoteFaqContent.phone}</Link>
          </AppButton>
        </div>

        <div className={clsx("grid gap-3 lg:gap-12 quote-faq-grid")}>
          <div className={clsx("flex flex-col gap-4")}>
            <AppSubTitleHeading>{quoteFaqContent.faq.title}</AppSubTitleHeading>
            <AppCollapse items={quoteFaqContent.faq.items} />
          </div>

          <div
            className={clsx(
              "flex flex-col gap-4 lg:gap-6",
              "rounded-xl border border-gray-100 bg-gray-50",
              "p-4 lg:p-8.25 shadow-sm"
            )}
          >
            <AppSubTitleHeading>Gửi Yêu Cầu Tư Vấn</AppSubTitleHeading>
            <AppQuoteForm
              variant="consultation"
              content={quoteFaqContent.form}
              submitIcon={<IconSend className={clsx("size-4 shrink-0")} />}
            />
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
