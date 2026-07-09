"use client";

import AppContainer from "@/shared/ui/app-container";
import AppSectionHeading from "@/shared/ui/app-section-heading";
import AppCollapse from "@/shared/ui/app-collapse";
import AppQuoteForm from "@/shared/ui/app-quote-form";
import IconSend from "@/assets/icons/icon-send.svg";
import { quoteFaqContent } from "./content";

export default function QuoteFaqSection() {
  return (
    <section id={quoteFaqContent.id} className="bg-white py-14 sm:py-20">
      <AppContainer className="flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <AppSectionHeading showDivider={false}>{quoteFaqContent.heading}</AppSectionHeading>
          <p className="text-center text-base leading-6 text-[#4b5563]">{quoteFaqContent.subtitle}</p>
          <a
            href={`tel:${quoteFaqContent.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-app-brand-teal px-8 py-3 text-lg leading-7 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M9.84375 0.000792688C14.3473 0.000792688 18 3.65353 18 8.15704C18 8.62462 17.6238 9.00079 17.1562 9.00079C16.6887 9.00079 16.3125 8.62462 16.3125 8.15704C16.3125 4.58517 13.4156 1.68829 9.84375 1.68829C9.37617 1.68829 9 1.31212 9 0.844543C9 0.376965 9.37617 0.000792688 9.84375 0.000792688ZM10.125 6.75079C10.7459 6.75079 11.25 7.25489 11.25 7.87579C11.25 8.4967 10.7459 9.00079 10.125 9.00079C9.5041 9.00079 9 8.4967 9 7.87579C9 7.25489 9.5041 6.75079 10.125 6.75079ZM9 4.21954C9 3.75196 9.37617 3.37579 9.84375 3.37579C12.484 3.37579 14.625 5.51681 14.625 8.15704C14.625 8.62462 14.2488 9.00079 13.7812 9.00079C13.3137 9.00079 12.9375 8.62462 12.9375 8.15704C12.9375 6.44845 11.5523 5.06329 9.84375 5.06329C9.37617 5.06329 9 4.68712 9 4.21954ZM4.13086 0.0500114C4.81289 -0.136317 5.52656 0.21173 5.79727 0.865636L7.20352 4.24064C7.44258 4.81368 7.27734 5.47814 6.7957 5.86837L5.0625 7.28868C6.2332 9.76368 8.23711 11.7676 10.7121 12.9383L12.1289 11.2051C12.5227 10.7234 13.1836 10.5582 13.7566 10.7973L17.1316 12.2035C17.7855 12.4742 18.1336 13.1879 17.9473 13.8699L17.1035 16.9637C16.9383 17.5754 16.3828 18.0008 15.75 18.0008C7.05234 18.0008 0 10.9484 0 2.25079C0 1.61798 0.425391 1.06251 1.03711 0.893761L4.13086 0.0500114Z"
                fill="currentColor"
              />
            </svg>
            {quoteFaqContent.phone}
          </a>
        </div>

        <div className="grid gap-12 quote-faq-grid">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl leading-8 font-bold text-app-accent-blue">{quoteFaqContent.faq.title}</h3>
            <AppCollapse items={quoteFaqContent.faq.items} />
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-gray-50 p-[33px] shadow-sm">
            <h3 className="text-2xl leading-8 font-bold text-app-accent-blue">Gửi Yêu Cầu Tư Vấn</h3>
            <AppQuoteForm
              variant="consultation"
              content={quoteFaqContent.form}
              submitIcon={<IconSend className="size-4 shrink-0" />}
            />
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
