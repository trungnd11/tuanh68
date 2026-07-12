import clsx from "clsx";
import { contactInfo } from "./content";

function ContactItem({ icon: Icon, text }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string | string[] }) {
  return (
    <div className={clsx("flex gap-3")}>
      <Icon className={clsx("mt-[6px] size-[14px] shrink-0 text-app-neutral-300")} />
      <div>
        {Array.isArray(text) ? (
          text.map((line, i) => (
            <p
              key={i}
              className={clsx(
                "text-[12px] font-normal leading-[18px] text-app-neutral-300 lg:text-[14px] lg:leading-[20px]"
              )}
            >
              {line}
            </p>
          ))
        ) : (
          <p
            className={clsx(
              "text-[12px] font-normal leading-[18px] text-app-neutral-300 lg:text-[14px] lg:leading-[20px]"
            )}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className={clsx("border-b border-app-neutral-600 pb-[9px]")}>
      <h3 className={clsx("text-[16px] font-bold leading-7 text-white uppercase lg:text-[18px] lg:leading-[28px]")}>
        {children}
      </h3>
    </div>
  );
}

export default function FooterContact() {
  return (
    <div className={clsx("flex w-full flex-col gap-6 xl:w-[373.33px]")}>
      <SectionHeading>{contactInfo.heading}</SectionHeading>
      <div className={clsx("flex w-full flex-col gap-[15.5px]")}>
        {contactInfo.items.map((item) => (
          <ContactItem key={item.text.toString()} icon={item.icon} text={item.text} />
        ))}
      </div>
    </div>
  );
}
