"use client";

import clsx from "clsx";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import AppButton from "@/shared/ui/app-button";
import AppInput from "@/shared/ui/app-input";
import RecaptchaConfirmModal from "./recaptcha-confirm-modal";
import SignupFormSuccessModal from "./signup-form-success-modal";
import { getPurchaseGuideSignup, getPurchaseGuideValidationMessages } from "@/app/sections/purchase-guide/data";
import { usePurchaseGuideSignupForm } from "../../hooks/usePurchaseGuideSignupForm";
import { getFieldError, shouldShowFieldError } from "@/app/sections/purchase-guide/utils/purchase-guide-signup-form";
import {
  createEmailSchema,
  createFullNameSchema,
  createPhoneSchema,
  createStockQuantitySchema,
} from "../../hooks/usePurchaseGuideSignupForm/purchase-schema-validation";
import { formatShareQuantityDisplay, normalizeShareQuantityInput } from "./share-quantity-input";

export default function PurchaseGuideSignupForm() {
  const t = useTranslations("HomePage.purchaseGuide");
  const purchaseGuideSignup = getPurchaseGuideSignup(t);
  const validationMessages = getPurchaseGuideValidationMessages(t);
  const fullNameSchema = useMemo(() => createFullNameSchema(validationMessages.fullName), [validationMessages]);
  const phoneSchema = useMemo(() => createPhoneSchema(validationMessages.phone), [validationMessages]);
  const emailSchema = useMemo(() => createEmailSchema(validationMessages.email), [validationMessages]);
  const stockQuantitySchema = useMemo(
    () => createStockQuantitySchema(validationMessages.shareQuantity),
    [validationMessages]
  );
  const [fullNameField, phoneField, emailField, shareQuantityField, referralCodeField] = purchaseGuideSignup.fields;
  const {
    form,
    isPendingSubmit,
    emailInputRef,
    fullNameInputRef,
    phoneInputRef,
    submitError,
    isConfirming,
    confirmModalOpen,
    successModalOpen,
    confirmSubmit,
    closeConfirmModal,
    closeSuccessModal,
  } = usePurchaseGuideSignupForm();

  return (
    <>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="flex min-w-0 w-full max-w-full xl:max-w-133 flex-col gap-2"
      >
        <form.Field name="FullName" validators={{ onBlur: fullNameSchema, onChange: fullNameSchema }}>
          {(field) => {
            const error = getFieldError(field.state.meta.errors);
            const visibleError = shouldShowFieldError(
              Boolean(error),
              field.state.meta.isTouched,
              field.form.state.submissionAttempts
            )
              ? error
              : undefined;

            return (
              <AppInput
                autoComplete="name"
                name={field.name}
                type={fullNameField.type}
                label={fullNameField.label}
                placeholder={fullNameField.placeholder}
                value={field.state.value}
                error={visibleError}
                inputRef={fullNameInputRef}
                inputClassName="text-body-sm-medium"
                onBlur={field.handleBlur}
                onInput={(event) => field.handleChange(event.currentTarget.value)}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>

        <form.Field name="Phone" validators={{ onBlur: phoneSchema, onChange: phoneSchema }}>
          {(field) => {
            const error = getFieldError(field.state.meta.errors);
            const visibleError = shouldShowFieldError(
              Boolean(error),
              field.state.meta.isTouched,
              field.form.state.submissionAttempts
            )
              ? error
              : undefined;

            return (
              <AppInput
                autoComplete="tel"
                name={field.name}
                type={phoneField.type}
                label={phoneField.label}
                placeholder={phoneField.placeholder}
                value={field.state.value}
                error={visibleError}
                inputRef={phoneInputRef}
                inputClassName="text-body-sm-medium"
                onBlur={field.handleBlur}
                onInput={(event) => field.handleChange(event.currentTarget.value)}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>

        <form.Field name="Email" validators={{ onBlur: emailSchema, onChange: emailSchema }}>
          {(field) => {
            const error = getFieldError(field.state.meta.errors);
            const visibleError = shouldShowFieldError(
              Boolean(error),
              field.state.meta.isTouched,
              field.form.state.submissionAttempts
            )
              ? error
              : undefined;

            return (
              <AppInput
                autoComplete="email"
                name={field.name}
                type={emailField.type}
                label={emailField.label}
                placeholder={emailField.placeholder}
                value={field.state.value}
                error={visibleError}
                inputRef={emailInputRef}
                inputClassName="text-body-sm-medium"
                onBlur={field.handleBlur}
                onInput={(event) => field.handleChange(event.currentTarget.value)}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>

        <form.Field name="ShareQuantity" validators={{ onBlur: stockQuantitySchema, onChange: stockQuantitySchema }}>
          {(field) => {
            const error = getFieldError(field.state.meta.errors);
            const visibleError = shouldShowFieldError(
              Boolean(error),
              field.state.meta.isTouched,
              field.form.state.submissionAttempts
            )
              ? error
              : undefined;

            return (
              <AppInput
                inputMode="numeric"
                name={field.name}
                type={shareQuantityField.type}
                label={shareQuantityField.label}
                placeholder={shareQuantityField.placeholder}
                value={formatShareQuantityDisplay(field.state.value)}
                error={visibleError}
                inputClassName="text-body-sm-medium"
                onBlur={field.handleBlur}
                onInput={(event) => field.handleChange(normalizeShareQuantityInput(event.currentTarget.value))}
                onChange={(event) => field.handleChange(normalizeShareQuantityInput(event.target.value))}
              />
            );
          }}
        </form.Field>

        <form.Field name="ReferralCode">
          {(field) => {
            const error = getFieldError(field.state.meta.errors);
            const visibleError = shouldShowFieldError(
              Boolean(error),
              field.state.meta.isTouched,
              field.form.state.submissionAttempts
            )
              ? error
              : undefined;

            return (
              <AppInput
                name={field.name}
                label={referralCodeField.label}
                placeholder={referralCodeField.placeholder}
                value={field.state.value}
                error={visibleError}
                inputClassName="text-body-sm-medium"
                onBlur={field.handleBlur}
                onInput={(event) => field.handleChange(event.currentTarget.value)}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            );
          }}
        </form.Field>

        <>
          {submitError ? <p className="px-2 text-body-xs-medium text-app-red-300">{submitError}</p> : null}
          <AppButton
            type="submit"
            disabled={isPendingSubmit}
            className={clsx(
              "mt-3 flex h-13 w-full items-center justify-center rounded-xl",
              "bg-main-app-yellow text-body-base-semibold text-black",
              "tracking-[-0.15px]",
              isPendingSubmit && "cursor-not-allowed opacity-70"
            )}
            cornerRadius={12}
          >
            {isPendingSubmit ? purchaseGuideSignup.submitting : purchaseGuideSignup.cta}
          </AppButton>
        </>
      </form>

      <SignupFormSuccessModal successModalOpen={successModalOpen} closeSuccessModal={closeSuccessModal} />

      <RecaptchaConfirmModal
        open={confirmModalOpen}
        loading={isConfirming}
        onClose={closeConfirmModal}
        onConfirm={confirmSubmit}
      />
    </>
  );
}
