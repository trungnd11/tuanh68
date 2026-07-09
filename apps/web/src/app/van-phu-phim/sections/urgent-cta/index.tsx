import Image from "next/image";
import AppButton from "@/shared/ui/app-button";
import AppQuoteForm from "@/shared/ui/app-quote-form";
import IconEye from "@/assets/icons/icon-eye.svg";
import IconDocument from "@/assets/icons/icon-document.svg";
import IconSend from "@/assets/icons/icon-send.svg";
import IconCall from "@/assets/icons/call.svg";
import IconMail from "@/assets/icons/mail.svg";
import IconMapPin from "@/assets/icons/icon-map-pin.svg";
import { urgentCtaContent } from "./content";

const contactIconMap = {
  phone: <IconCall className="text-white" />,
  mail: <IconMail className="text-white" />,
  map: <IconMapPin className="text-white" />,
} as const;

export default function UrgentCtaSection() {
  return (
    <section className="relative flex flex-col items-start overflow-hidden bg-app-brand-teal px-[208px] py-20 max-xl:px-8 max-md:py-12">
      <div className="absolute inset-0 opacity-10">
        <Image src={urgentCtaContent.backgroundTexture} alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div
        className="absolute -left-[115.2px] -top-[115.2px] size-[288px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle at center, rgba(41,115,178,1) 0%, rgba(41,115,178,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-[153.6px] -right-[153.6px] size-[384px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle at center, rgba(26,90,138,1) 0%, rgba(26,90,138,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1024px] flex-col items-start gap-14 px-8 max-md:px-0">
        <div className="flex w-full items-start justify-center gap-12 overflow-hidden max-xl:flex-col">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex w-full shrink-0 items-center gap-3">
              <div className="h-0.5 w-10 shrink-0 bg-white/50" />
              <span className="text-sm font-semibold uppercase leading-5 tracking-[1.4px] text-white/80">
                {urgentCtaContent.badge}
              </span>
            </div>

            <div className="w-full text-5xl font-black uppercase leading-[48px] text-white max-md:text-4xl max-md:leading-[44px]">
              <p className="mb-0">NHẬN BÁO GIÁ</p>
              <p className="text-white/80">TRONG 30 PHÚT!</p>
            </div>

            <div className="w-full pt-[4px] text-lg font-normal leading-[29.25px] text-[#ccfbf1]">
              <p className="mb-0">Gửi yêu cầu ngay để nhận báo giá ưu đãi nhất, tư vấn</p>
              <p className="mb-0">lựa chọn loại ván phù hợp và ưu tiên giao hàng cho</p>
              <p>đơn hàng đầu tiên.</p>
            </div>

            <div className="flex w-full shrink-0 items-start gap-4 pt-3 max-md:flex-col">
              <AppButton
                href={urgentCtaContent.buttons.primary.href}
                className="relative flex shrink-0 items-center justify-center gap-3 self-stretch rounded-[12px] bg-white px-8 py-4 text-sm font-black uppercase leading-5 tracking-[0.35px] text-[#48a6a7] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
              >
                <span className="inline-flex shrink-0 items-center">
                  <IconEye className="size-4.5" />
                </span>
                <span className="whitespace-nowrap">{urgentCtaContent.buttons.primary.label}</span>
              </AppButton>
              <AppButton
                href={urgentCtaContent.buttons.secondary.href}
                className="relative flex shrink-0 items-center justify-center gap-3 self-stretch rounded-[12px] border-2 border-solid border-white px-[34px] py-[18px] text-sm font-bold uppercase leading-5 tracking-[0.35px] text-white"
              >
                <span className="inline-flex shrink-0 items-center">
                  <IconDocument className="size-[14px]" />
                </span>
                <span className="whitespace-nowrap">{urgentCtaContent.buttons.secondary.label}</span>
              </AppButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-6 rounded-[16px] bg-white p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <AppQuoteForm
              variant="quote"
              content={urgentCtaContent.form}
              products={urgentCtaContent.products}
              submitIcon={<IconSend className="size-[14px] shrink-0" />}
            />
          </div>
        </div>

        <div className="flex w-full shrink-0 items-start justify-center gap-8 border-t border-[rgba(255,255,255,0.2)] pt-[41px] max-lg:flex-wrap">
          {urgentCtaContent.contactInfo.map((info) => (
            <div key={info.label} className="relative self-stretch shrink-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex shrink-0 pb-[5.75px] pt-[4.25px]">
                  <span className="size-[18px]">{contactIconMap[info.icon as keyof typeof contactIconMap]}</span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-normal uppercase leading-4 tracking-[0.3px] text-[#ccfbf1] whitespace-nowrap">
                    {info.label}
                  </span>
                  <span className="text-base font-bold leading-6 text-white whitespace-nowrap">{info.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
