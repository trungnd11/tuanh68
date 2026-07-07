import clsx from "clsx";
import { useTranslations } from "next-intl";
import AppModal from "@/shared/ui/app-modal";
import AppButton from "@/shared/ui/app-button";
import CheckedCircleIcon from "@/assets/icons/checked-circle.svg";
import { getPurchaseGuideSuccessContent } from "@/app/sections/purchase-guide/data";

const REDIRECT_URL = "https://www.vietcap.com.vn/mobile-app";

interface SignupFormSuccessModalProps {
  successModalOpen: boolean;
  closeSuccessModal: () => void;
}

function handleRedirect() {
  window.open(REDIRECT_URL, "_blank");
}

export default function SignupFormSuccessModal({ successModalOpen, closeSuccessModal }: SignupFormSuccessModalProps) {
  const t = useTranslations("HomePage.purchaseGuide");
  const content = getPurchaseGuideSuccessContent(t);

  return (
    <AppModal
      customLayout
      open={successModalOpen}
      onClose={() => {
        handleRedirect();
        closeSuccessModal();
      }}
      title={content.modalTitle}
      body={{
        appBorderRadiusProps: { classNameContainer: clsx("w-full px-4 xl:w-[30%] xl:px-0") },
      }}
    >
      <div className="flex w-full flex-col items-center gap-5 p-4 text-center xl:px-0 xl:py-10">
        <CheckedCircleIcon className="h-16 w-16 shrink-0" />
        <h3 className="text-heading-base-bold">{content.title}</h3>

        <div className="flex flex-col gap-2 text-body-sm-medium text-white/78">
          <p>{content.description}</p>
          <p>{content.redirectHint}</p>
        </div>

        <AppButton
          className={clsx(
            "mt-2 flex h-12 min-w-40 items-center justify-center rounded-xl px-6",
            "bg-main-app-yellow text-body-base-semibold text-black tracking-[-0.15px]"
          )}
          cornerRadius={10}
          onClick={() => {
            handleRedirect();
            closeSuccessModal();
          }}
        >
          {content.redirect}
        </AppButton>
      </div>
    </AppModal>
  );
}
