import { useTranslations } from "next-intl";
import { getPurchaseGuideContacts } from "@/app/sections/purchase-guide/data";
import AppBorderRadius from "@/shared/ui/app-border-radius";
import { appColors, hexToRgba } from "@/shared/theme";
import clsx from "clsx";
import CallIcon from "@/assets/icons/call.svg";
import MailIcon from "@/assets/icons/mail.svg";

export default function PurchaseGuideContactCards() {
  const t = useTranslations("HomePage.purchaseGuide");
  const purchaseGuideContacts = getPurchaseGuideContacts(t);

  return (
    <div className="grid gap-3 xl:grid-cols-2 xl:gap-6">
      {purchaseGuideContacts.map((contact) => {
        const Icon = contact.type === "phone" ? CallIcon : MailIcon;

        return (
          <div key={contact.label} className="min-w-0">
            <AppBorderRadius
              cornerRadius={16}
              borderWidth={1}
              borderColor={hexToRgba(appColors.appGreen[500], 0.5)}
              classNameBorder={clsx("h-full bg-app-primary-25")}
            >
              <article
                key={contact.label}
                className={clsx(
                  "flex gap-4 px-4.75 py-[19.25px] md:px-6 xl:min-h-0 xl:items-center xl:gap-5 xl:px-5.75 xl:py-10.75"
                )}
              >
                <AppBorderRadius cornerRadius={16}>
                  <div className="flex size-12 shrink-0 items-center justify-center bg-app-primary-75 xl:size-18">
                    <Icon className={clsx("h-7 w-7 xl:h-11 xl:w-11")} />
                  </div>
                </AppBorderRadius>

                <div className={clsx("flex flex-col gap-2")}>
                  <p
                    className={clsx(
                      "text-body-sm-bold xl:text-body-base-bold leading-5 uppercase",
                      "tracking-[0.3px] text-app-neutral-600"
                    )}
                  >
                    {contact.label}
                  </p>
                  <p
                    className={clsx(
                      "text-app-primary-500",
                      contact.isEmail
                        ? "text-body-base-bold xl:text-heading-base-bold"
                        : "text-subtitle-sm-regular font-bold xl:text-heading-lg-bold xl:leading-8 tracking-[0.7px]"
                    )}
                  >
                    {contact.value}
                  </p>
                  {/*<p className="text-body-sm-medium text-app-neutral-600">{contact.description}</p>*/}
                </div>
              </article>
            </AppBorderRadius>
          </div>
        );
      })}
    </div>
  );
}
