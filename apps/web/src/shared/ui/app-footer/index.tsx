import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FacebookIcon from "@/assets/icons/facebook.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import F88Logo from "@/assets/logo/f88-logo-footer.svg";
import { appSectionIds } from "@/shared/config/app";
import AppContent from "@/shared/ui/app-content";
import { footerAddressItems, footerNavigationItems } from "./content";

const socialLinks = [
  { label: "Facebook", href: "#", icon: <FacebookIcon /> },
  { label: "LinkedIn", href: "#", icon: <LinkedinIcon /> },
  { label: "YouTube", href: "#", icon: <YoutubeIcon /> },
] as const;

export default function AppFooter() {
  const tMenu = useTranslations("HomePage.footer.menu");
  const tAddresses = useTranslations("HomePage.footer.addresses");
  const tMeta = useTranslations("HomePage.footer.meta");

  return (
    <footer className="bg-main-app-bg-footer pt-9 text-white xl:py-18">
      <AppContent className="px-4 md:px-6 xl:px-0">
        <div className="flex flex-col gap-4 pb-7 xl:flex-row xl:items-start xl:justify-between xl:gap-10 xl:pb-12.5">
          <div className="flex w-full flex-col gap-5 xl:w-121.75">
            <Link aria-label="F88 IPO" className="inline-flex" href={`#${appSectionIds.banner}`}>
              <F88Logo className="h-10.5 w-25.25 overflow-visible" aria-hidden="true" focusable="false" />
            </Link>
            <p className="hidden text-body-base-regular text-white/90 xl:block">{tMeta("copyright")}</p>
          </div>

          <div className="flex flex-col items-start gap-8 xl:flex-1 xl:items-end xl:gap-4">
            <div className="flex items-center gap-3 xl:gap-5">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className={clsx(
                    "flex size-9 items-center justify-center",
                    "rounded-full bg-white/10 text-white transition-colors hover:bg-white/16"
                  )}
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <nav
              className={clsx(
                "flex flex-wrap gap-x-4 gap-y-2 xl:justify-end xl:gap-x-5 xl:gap-y-3",
                "text-body-sm-regular leading-6 text-white/90 xl:text-body-base-regular"
              )}
            >
              {footerNavigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className="tracking-[-0.312px] transition-colors duration-200 hover:text-white"
                >
                  {tMenu(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </AppContent>

      <div className="border-t border-[#333443]">
        <AppContent
          className={clsx("mt-7 flex flex-col gap-6 pb-7 xl:mt-12 xl:flex-row xl:justify-between xl:gap-8 xl:pb-0")}
        >
          {footerAddressItems.map((address) => (
            <div key={address.titleKey} className={clsx("flex flex-col gap-2 xl:max-w-142.25")}>
              <h3 className={clsx("text-body-base-medium tracking-[-0.312px] text-white")}>
                {tAddresses(address.titleKey)}
              </h3>
              <p className="text-body-sm-regular leading-6 tracking-[-0.312px] text-white/80 xl:text-body-base-regular">
                {tAddresses(address.descriptionKey)}
              </p>
            </div>
          ))}
        </AppContent>
      </div>

      <p className={clsx("border-t border-[#333443] py-7 text-center text-body-sm-regular text-white/90 xl:hidden")}>
        {tMeta("copyright")}
      </p>
    </footer>
  );
}
