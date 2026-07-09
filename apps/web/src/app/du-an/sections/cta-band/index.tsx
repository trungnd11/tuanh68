import AppButton from "@/shared/ui/app-button";
import IconCall from "@/assets/icons/call.svg";
import IconMail from "@/assets/icons/mail.svg";
import { ctaBandContent } from "./content";

export default function CtaBandSection() {
  return (
    <div className="flex flex-col items-start border-b border-gray-100 bg-white px-[272px] pb-[65px] pt-16 max-lg:px-8">
      <div className="mx-auto flex w-full max-w-[896px] flex-col items-center gap-5 px-8">
        <div className="inline-flex rounded-full bg-[rgba(72,166,167,0.1)] px-4 py-[6px] text-xs font-bold uppercase leading-4 tracking-[1.2px] text-app-brand-teal">
          {ctaBandContent.badge}
        </div>

        <h2 className="w-full text-center text-4xl font-extrabold uppercase leading-10 tracking-[0.9px] text-[#333]">
          {ctaBandContent.title}
        </h2>

        <p className="w-full max-w-[576px] text-center text-base font-normal leading-[26px] text-gray-500">
          {ctaBandContent.description[0]}
          <br />
          {ctaBandContent.description[1]}
        </p>

        <div className="flex w-full items-start justify-center gap-4 pt-3 max-md:flex-col">
          <AppButton
            href={ctaBandContent.primary.href}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-[#2973b2] bg-[#2973b2] px-8 py-4 text-base font-bold uppercase leading-6 tracking-[0.4px] text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
          >
            <span className="inline-flex py-1">
              <IconCall className="size-4" />
            </span>
            <span>{ctaBandContent.primary.label}</span>
          </AppButton>
          <AppButton
            href={ctaBandContent.secondary.href}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-[#2973b2] px-[34px] py-4 text-base font-bold uppercase leading-6 tracking-[0.4px] text-[#2973b2]"
          >
            <span className="inline-flex py-1">
              <IconMail className="size-4" />
            </span>
            <span>{ctaBandContent.secondary.label}</span>
          </AppButton>
        </div>
      </div>
    </div>
  );
}
