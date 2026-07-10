import clsx from "clsx";
import AppQuoteForm from "@/shared/ui/app-quote-form";
import IconSend from "@/assets/icons/icon-send.svg";
import { urgentCtaContent } from "./content";

export default function UrgentCtaFormCard() {
  return (
    <div
      className={clsx(
        "flex min-w-0 flex-1 flex-col items-start gap-6 rounded-2xl bg-white",
        "p-4 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:p-6 lg:p-8"
      )}
    >
      <AppQuoteForm
        variant="quote"
        content={urgentCtaContent.form}
        products={urgentCtaContent.products}
        submitIcon={<IconSend className={clsx("size-3.5 shrink-0")} />}
      />
    </div>
  );
}
