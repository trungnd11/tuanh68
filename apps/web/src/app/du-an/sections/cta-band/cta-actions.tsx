import clsx from "clsx";
import AppButton from "@/shared/ui/app-button";
import IconCall from "@/assets/icons/call.svg";
import IconMail from "@/assets/icons/mail.svg";
import { ctaBandContent } from "./content";

const wrapperClass = clsx(
  "w-full sm:w-auto",
  "[&>span]:flex [&>span]:w-full",
  "sm:[&>span]:inline-flex sm:[&>span]:w-auto"
);

export default function CtaActions() {
  return (
    <div className={clsx("flex w-full items-start justify-center gap-4 pt-3 max-md:flex-col")}>
      <div className={wrapperClass}>
        <AppButton
          cornerRadius={8}
          className={clsx(
            "flex w-full items-center justify-center gap-2 px-8 py-3 sm:w-auto",
            "bg-[#2973b2] text-base font-bold uppercase leading-6 tracking-[0.4px] text-white",
            "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          )}
        >
          <span className={clsx("inline-flex py-1")}>
            <IconCall className={clsx("size-4")} />
          </span>
          <span>{ctaBandContent.primary.label}</span>
        </AppButton>
      </div>

      <div className={wrapperClass}>
        <AppButton
          cornerRadius={8}
          borderRadiusProps={{
            borderWidth: 2,
            borderColor: "#2973b2",
            classNameBorder: clsx("bg-white"),
          }}
          className={clsx(
            "flex w-full items-center justify-center gap-2 px-8.5 py-2.5 sm:w-auto",
            "text-base font-bold uppercase leading-6 tracking-[0.4px] text-[#2973b2]"
          )}
        >
          <span className={clsx("inline-flex py-1")}>
            <IconMail className={clsx("size-4")} />
          </span>
          <span>{ctaBandContent.secondary.label}</span>
        </AppButton>
      </div>
    </div>
  );
}
