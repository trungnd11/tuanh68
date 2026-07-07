import { useRef } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppModal from "@/shared/ui/app-modal";
import AppButton from "@/shared/ui/app-button";

interface PurchaseGuideGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/9CYIg0MKciw";

export default function PurchaseGuideGuideModal({ open, onClose }: PurchaseGuideGuideModalProps) {
  const t = useTranslations("HomePage.purchaseGuide");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleClose() {
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
    onClose();
  }

  return (
    <AppModal
      customLayout
      open={open}
      onClose={handleClose}
      title=""
      body={{
        className: clsx("p-0!"),
        appBorderRadiusProps: { classNameContainer: clsx("w-full xl:max-w-[800px] px-4 xl:px-0") },
      }}
    >
      <div className="flex w-full max-w-full flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-body-sm-medium xl:text-heading-sm-medium">{t("guideButton")}</h3>
          <AppButton
            aria-label="Dong"
            className={clsx(
              "flex h-7 w-7 shrink-0 xl:h-9 xl:w-9 items-center justify-center rounded-full",
              "border border-white/12 bg-white/6 text-white"
            )}
            disabledAnimation
            onClick={handleClose}
          >
            x
          </AppButton>
        </div>
        <div className="w-full overflow-hidden rounded-b-xl">
          <div className="aspect-video w-full max-h-[50dvh]">
            <iframe
              ref={iframeRef}
              src={open ? YOUTUBE_EMBED_URL : undefined}
              title={t("guideButton")}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </AppModal>
  );
}
