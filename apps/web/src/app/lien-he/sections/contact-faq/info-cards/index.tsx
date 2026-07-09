import clsx from "clsx";
import IconPhone from "@/assets/icons/icon-phone.svg";
import Mail from "@/assets/icons/mail.svg";
import IconMapPin from "@/assets/icons/icon-map-pin.svg";
import ExternalLink from "@/assets/icons/external-link.svg";
import Facebook from "@/assets/icons/facebook.svg";
import Youtube from "@/assets/icons/youtube.svg";
import IconTwitter from "@/assets/icons/icon-twitter.svg";
import IconTiktok from "@/assets/icons/icon-tiktok.svg";
import IconZalo from "@/assets/icons/icon-zalo.svg";
import { contactFaqContent } from "../content";

function InfoCard({
  badge,
  icon,
  iconBg,
  children,
}: {
  badge: string;
  icon: React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex gap-5 rounded-[16px] border border-[#f3f4f6] bg-white p-[25px]",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className={`flex size-14 shrink-0 items-center justify-center rounded-[12px] ${iconBg}`}>{icon}</div>
      <div className="flex flex-col gap-[2.9px]">
        <span className="text-xs font-bold uppercase tracking-[1.2px] text-app-brand-teal">{badge}</span>
        {children}
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className={clsx(
        "flex size-11 items-center justify-center rounded-[12px]",
        "bg-[rgba(255,255,255,0.15)]",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "transition-opacity hover:opacity-80"
      )}
    >
      {icon}
    </a>
  );
}

export default function InfoCards() {
  return (
    <div className="flex flex-col gap-5">
      <InfoCard
        badge={contactFaqContent.address.badge}
        icon={<IconMapPin className="shrink-0" />}
        iconBg="bg-[rgba(41,115,178,0.1)]"
      >
        <h4 className="text-base font-black text-[#333]">{contactFaqContent.address.title}</h4>
        <p className="text-sm leading-[22.75px] text-[#6b7280]">
          {contactFaqContent.address.line1}
          <br />
          {contactFaqContent.address.line2}
        </p>
        <a
          href={contactFaqContent.address.linkHref}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-app-brand-teal"
        >
          <ExternalLink className="shrink-0" />
          <span>{contactFaqContent.address.linkLabel}</span>
        </a>
      </InfoCard>

      <InfoCard
        badge={contactFaqContent.phone.badge}
        icon={<IconPhone className="shrink-0" />}
        iconBg="bg-[rgba(72,166,167,0.1)]"
      >
        <h4 className="text-base font-black text-[#333]">{contactFaqContent.phone.number}</h4>
        <p className="text-sm text-[#6b7280]">{contactFaqContent.phone.secondary}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="size-2 rounded-full bg-[#7a9c59]" />
          <span className="text-xs font-semibold text-[#7a9c59]">{contactFaqContent.phone.status}</span>
        </div>
      </InfoCard>

      <InfoCard
        badge={contactFaqContent.email.badge}
        icon={<Mail className="shrink-0" />}
        iconBg="bg-[rgba(41,115,178,0.1)]"
      >
        <h4 className="text-base font-black text-[#333]">{contactFaqContent.email.address}</h4>
        <p className="text-sm text-[#6b7280]">{contactFaqContent.email.note}</p>
        <a
          href={contactFaqContent.email.linkHref}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-app-brand-teal"
        >
          <ExternalLink className="shrink-0" />
          <span>{contactFaqContent.email.linkLabel}</span>
        </a>
      </InfoCard>

      <InfoCard
        badge={contactFaqContent.hours.badge}
        icon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <circle cx="10" cy="10" r="7.5" stroke="#48a6a7" strokeWidth="1.5" />
            <path d="M10 5V10L12.5 12" stroke="#48a6a7" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
        iconBg="bg-[rgba(122,156,89,0.1)]"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#333]">{contactFaqContent.hours.weekdays.label}</span>
            <span className="text-sm font-medium text-[#6b7280]">{contactFaqContent.hours.weekdays.value}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#333]">{contactFaqContent.hours.saturday.label}</span>
            <span className="text-sm font-medium text-[#6b7280]">{contactFaqContent.hours.saturday.value}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#9ca3af]">{contactFaqContent.hours.sunday.label}</span>
            <span className="text-xs font-bold uppercase text-[#b20000]">{contactFaqContent.hours.sunday.value}</span>
          </div>
        </div>
      </InfoCard>

      <div
        className={clsx(
          "relative flex flex-col gap-3 rounded-[16px] p-6",
          "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]"
        )}
        style={{ background: "linear-gradient(161deg, rgb(41,115,178) 0%, rgb(72,166,167) 100%)" }}
      >
        <span className="text-xs font-bold uppercase tracking-[1.2px] text-[rgba(255,255,255,0.8)]">
          {contactFaqContent.social.badge}
        </span>
        <h4 className="text-base font-black text-white">{contactFaqContent.social.title}</h4>
        <div className="flex gap-3 pt-1">
          <SocialLink href="#" icon={<Facebook className="shrink-0" />} />
          <SocialLink href="#" icon={<Youtube className="shrink-0" />} />
          <SocialLink href="#" icon={<IconTwitter className="shrink-0" />} />
          <SocialLink href="#" icon={<IconTiktok className="shrink-0" />} />
          <SocialLink href="#" icon={<IconZalo className="shrink-0" />} />
        </div>
      </div>
    </div>
  );
}
