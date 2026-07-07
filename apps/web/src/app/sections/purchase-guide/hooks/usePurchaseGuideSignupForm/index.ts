"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { getPurchaseGuideValidationMessages } from "@/app/sections/purchase-guide/data";
import { useSyncAutofilledInputs } from "@/app/sections/purchase-guide/hooks/useSyncAutofilledInputs";
import { usePurchaseGuideSignup } from "@/app/sections/purchase-guide/hooks/usePurchaseGuideSignup";
import { appConfig } from "@/shared/config/app";
import { acceptPurchaseGuideRecaptchaConsent, hasAcceptedPurchaseGuideRecaptchaConsent } from "./recaptcha-consent";
import { buildCreatePurchaseGuidePayload } from "./build-create-purchase-guide-payload";
import { getPurchaseGuideSignupErrorMessage } from "./get-purchase-guide-signup-error-message";
import { purchaseDefaultValue } from "./purchase-default-value";
import { createPurchaseGuideSignupFormSchema } from "./purchase-schema-validation";
import { syncAutofilledFieldValue } from "./sync-autofilled-field";
import { useSuccessCountdownModal } from "./use-success-countdown-modal";
import type { CreatePurchaseGuideForm } from "./types";

export function usePurchaseGuideSignupForm() {
  const t = useTranslations("HomePage.purchaseGuide");
  const validationMessages = getPurchaseGuideValidationMessages(t);
  const purchaseGuideSignupFormSchema = useMemo(
    () => createPurchaseGuideSignupFormSchema(validationMessages),
    [validationMessages]
  );
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingSubmitValue, setPendingSubmitValue] = useState<CreatePurchaseGuideForm | null>(null);
  const { successModalOpen, openSuccessModal, closeSuccessModal } = useSuccessCountdownModal();

  const { mutateAsync, isPending } = usePurchaseGuideSignup();

  const form = useForm({
    defaultValues: purchaseDefaultValue,
    validators: {
      onSubmit: purchaseGuideSignupFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);

      if (appConfig.disableRecaptchaForPentest) {
        await submitPurchaseGuide(value);
        return;
      }

      if (typeof window !== "undefined" && hasAcceptedPurchaseGuideRecaptchaConsent(window.localStorage)) {
        await submitPurchaseGuide(value);
        return;
      }

      setPendingSubmitValue(value);
      setConfirmModalOpen(true);
    },
  });

  const syncFullNameValue = useCallback(
    (nextValue: string) => {
      void syncAutofilledFieldValue(form, "FullName", nextValue);
    },
    [form]
  );

  const syncPhoneValue = useCallback(
    (nextValue: string) => {
      void syncAutofilledFieldValue(form, "Phone", nextValue);
    },
    [form]
  );

  const syncEmailValue = useCallback(
    (nextValue: string) => {
      void syncAutofilledFieldValue(form, "Email", nextValue);
    },
    [form]
  );

  const autofilledInputs = useMemo(
    () => [
      {
        currentValue: form.state.values.FullName,
        inputRef: fullNameInputRef,
        setValue: syncFullNameValue,
      },
      {
        currentValue: form.state.values.Phone,
        inputRef: phoneInputRef,
        setValue: syncPhoneValue,
      },
      {
        currentValue: form.state.values.Email,
        inputRef: emailInputRef,
        setValue: syncEmailValue,
      },
    ],
    [
      form.state.values.Email,
      form.state.values.FullName,
      form.state.values.Phone,
      syncEmailValue,
      syncFullNameValue,
      syncPhoneValue,
    ]
  );

  useSyncAutofilledInputs(autofilledInputs);

  const handleSuccess = useCallback(() => {
    form.reset();
    setPendingSubmitValue(null);
    openSuccessModal();
  }, [form, openSuccessModal]);

  const submitPurchaseGuide = useCallback(
    async (value: CreatePurchaseGuideForm) => {
      try {
        setSubmitError(null);

        const createPayload = await buildCreatePurchaseGuidePayload(value);

        await mutateAsync(createPayload);

        setConfirmModalOpen(false);
        handleSuccess();
      } catch (error) {
        setConfirmModalOpen(false);
        setSubmitError(getPurchaseGuideSignupErrorMessage(error, t));
      }
    },
    [handleSuccess, mutateAsync]
  );

  const confirmSubmit = useCallback(async () => {
    if (!pendingSubmitValue) return;

    setIsConfirming(true);

    if (typeof window !== "undefined") {
      acceptPurchaseGuideRecaptchaConsent(window.localStorage);
    }

    try {
      await submitPurchaseGuide(pendingSubmitValue);
    } finally {
      setIsConfirming(false);
    }
  }, [pendingSubmitValue, submitPurchaseGuide]);

  const closeConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
    setPendingSubmitValue(null);
    setIsConfirming(false);
  }, []);

  return {
    isPendingSubmit: isPending,
    form,
    emailInputRef,
    fullNameInputRef,
    phoneInputRef,
    submitError,
    successModalOpen,
    isConfirming,
    confirmModalOpen,
    confirmSubmit,
    closeConfirmModal,
    closeSuccessModal,
  };
}
