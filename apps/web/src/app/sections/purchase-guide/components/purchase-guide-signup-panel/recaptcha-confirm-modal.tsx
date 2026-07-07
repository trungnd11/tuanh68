"use client";

import { useTranslations } from "next-intl";
import AppModal from "@/shared/ui/app-modal";
import AppButton from "@/shared/ui/app-button";
import CheckedCircleIcon from "@/assets/icons/checked-circle.svg";
import clsx from "clsx";
import { getPurchaseGuideRecaptchaContent } from "@/app/sections/purchase-guide/data";

interface RecaptchaConfirmModalProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RecaptchaConfirmModal({ open, loading, onClose, onConfirm }: RecaptchaConfirmModalProps) {
  const t = useTranslations("HomePage.purchaseGuide");
  const content = getPurchaseGuideRecaptchaContent(t);

  return (
    <AppModal
      title=""
      open={open}
      onClose={onClose}
      customLayout
      body={{ appBorderRadiusProps: { classNameContainer: clsx("w-full px-4 xl:w-[30%] xl:px-0") } }}
    >
      <div className="bg-white text-app-neutral-950">
        <div className="grid gap-2 bg-app-primary-500 px-6 py-7 text-center text-white xl:gap-4">
          <div className="flex justify-center">
            <CheckedCircleIcon className="h-16 w-16 shrink-0" />
          </div>

          <div className={clsx("grid gap-1 xl:gap-2")}>
            <h3 className="text-heading-base-bold">{content.title}</h3>
            <p className="text-body-sm-medium text-white/85">{content.description}</p>
          </div>
        </div>

        <div className="grid gap-6 p-4 xl:p-6">
          <div className={clsx("grid gap-1 xl:gap-2")}>
            <p className="text-body-sm-medium text-app-neutral-600">{content.body}</p>

            <p className="text-body-xs-regular text-app-neutral-500">
              {content.policyPrefix}{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#00844a] underline"
              >
                {content.privacy}
              </a>{" "}
              {content.and}{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#00844a] underline"
              >
                {content.terms}
              </a>{" "}
              {content.policySuffix}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:gap-6">
            <AppButton
              type="button"
              disabled={loading}
              disabledAnimation
              onClick={onClose}
              className="h-11 w-full rounded-xl border border-app-neutral-200 bg-white text-app-neutral-700"
            >
              {content.cancel}
            </AppButton>

            <AppButton
              type="button"
              disabled={loading}
              disabledAnimation
              onClick={onConfirm}
              className="h-11 w-full rounded-xl bg-[#00844a] text-white"
            >
              {loading ? content.confirming : content.confirm}
            </AppButton>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
