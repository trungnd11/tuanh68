"use client";

import { useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { getInvestorFaqItems } from "@/app/sections/investor-faq/data";
import PlusCircleIcon from "@/assets/icons/plus-circle.svg";
import MinusCircleIcon from "@/assets/icons/minus-circle.svg";
import { toggleAccordionIndex } from "./open-indexes";

export default function InvestorFaqAccordion() {
  const t = useTranslations("HomePage.investorFaq");
  const investorFaqItems = getInvestorFaqItems(t);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  return (
    <div className="mx-auto flex w-full max-w-230 flex-col">
      {investorFaqItems.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={item.question}
            className={clsx(index !== investorFaqItems.length - 1 && "border-b border-app-neutral-300")}
          >
            <button
              type="button"
              onClick={() => setOpenIndexes((currentOpenIndexes) => toggleAccordionIndex(currentOpenIndexes, index))}
              className={clsx(
                "flex w-full items-start justify-between gap-6",
                "pt-3 pb-2.75 xl:pt-5.5 xl:pb-5.25 text-left cursor-pointer"
              )}
            >
              <div className="flex-1">
                <p className={clsx("text-body-lg-bold text-app-neutral-950", "text-base xl:text-lg")}>
                  {item.question}
                </p>
                <div
                  className={clsx(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] pt-4 xl:pt-6 opacity-100" : "grid-rows-[0fr] pt-0 opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-190 text-body-sm-medium text-app-neutral-600">{item.answer}</p>
                  </div>
                </div>
              </div>
              {isOpen ? <MinusCircleIcon /> : <PlusCircleIcon />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
