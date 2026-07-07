export type PurchaseGuideStep = {
  number: string;
  title: string;
  description: string;
};

export type PurchaseGuideField = {
  label: string;
  placeholder: string;
  type: "text" | "tel" | "email";
};

export type PurchaseGuideContact = {
  type: "phone" | "mail";
  label: string;
  value: string;
  description: string;
  isEmail: boolean;
};

type PurchaseGuideTranslations = {
  (key: "heading.title"): string;
  (key: "heading.description"): string;
  (key: "steps.counter", values: { total: number | string }): string;
  (key: "steps.prev"): string;
  (key: "steps.next"): string;
  (key: "steps.items.first.title"): string;
  (key: "steps.items.first.description"): string;
  (key: "steps.items.second.title"): string;
  (key: "steps.items.second.description"): string;
  (key: "steps.items.third.title"): string;
  (key: "steps.items.third.description"): string;
  (key: "steps.items.fourth.title"): string;
  (key: "steps.items.fourth.description"): string;
  (key: "steps.items.fifth.title"): string;
  (key: "steps.items.fifth.description"): string;
  (key: "guideButton"): string;
  (key: "guideModal.description"): string;
  (key: "guideModal.openButton"): string;
  (key: "signup.title"): string;
  (key: "signup.description"): string;
  (key: "signup.highlights.freeRegistration"): string;
  (key: "signup.highlights.hotlineSupport"): string;
  (key: "signup.highlights.simpleProcedure"): string;
  (key: "signup.fields.fullName.label"): string;
  (key: "signup.fields.fullName.placeholder"): string;
  (key: "signup.fields.phone.label"): string;
  (key: "signup.fields.phone.placeholder"): string;
  (key: "signup.fields.email.label"): string;
  (key: "signup.fields.email.placeholder"): string;
  (key: "signup.fields.referralCode.label"): string;
  (key: "signup.fields.referralCode.placeholder"): string;
  (key: "signup.selectField.label"): string;
  (key: "signup.selectField.placeholder"): string;
  (key: "signup.selectField.options.option500"): string;
  (key: "signup.selectField.options.option1000"): string;
  (key: "signup.selectField.options.option2000"): string;
  (key: "signup.selectField.options.option5000"): string;
  (key: "signup.cta"): string;
  (key: "signup.submitting"): string;
  (key: "contacts.phone.label"): string;
  (key: "contacts.phone.description"): string;
  (key: "contacts.email.label"): string;
  (key: "contacts.email.description"): string;
  (key: "recaptcha.title"): string;
  (key: "recaptcha.description"): string;
  (key: "recaptcha.body"): string;
  (key: "recaptcha.policyPrefix"): string;
  (key: "recaptcha.privacy"): string;
  (key: "recaptcha.and"): string;
  (key: "recaptcha.terms"): string;
  (key: "recaptcha.policySuffix"): string;
  (key: "recaptcha.cancel"): string;
  (key: "recaptcha.confirm"): string;
  (key: "recaptcha.confirming"): string;
  (key: "success.modalTitle"): string;
  (key: "success.title"): string;
  (key: "success.description"): string;
  (key: "success.redirect"): string;
  (key: "success.redirectHint"): string;
  (key: "validation.fullName.required"): string;
  (key: "validation.fullName.min"): string;
  (key: "validation.fullName.regex"): string;
  (key: "validation.phone.required"): string;
  (key: "validation.phone.invalid"): string;
  (key: "validation.email.required"): string;
  (key: "validation.email.invalid"): string;
  (key: "validation.shareQuantity.required"): string;
  (key: "validation.shareQuantity.invalid"): string;
  (key: "validation.shareQuantity.max"): string;
  (key: "validation.shareQuantity.step"): string;
};

export function getPurchaseGuideHeading(t: PurchaseGuideTranslations) {
  return {
    title: t("heading.title"),
    description: t("heading.description"),
  };
}

export function getPurchaseGuideSteps(t: PurchaseGuideTranslations): PurchaseGuideStep[] {
  return [
    { number: "01", title: t("steps.items.first.title"), description: t("steps.items.first.description") },
    { number: "02", title: t("steps.items.second.title"), description: t("steps.items.second.description") },
    { number: "03", title: t("steps.items.third.title"), description: t("steps.items.third.description") },
    { number: "04", title: t("steps.items.fourth.title"), description: t("steps.items.fourth.description") },
    { number: "05", title: t("steps.items.fifth.title"), description: t("steps.items.fifth.description") },
  ];
}

export function getPurchaseGuideGuideButton(t: PurchaseGuideTranslations) {
  return t("guideButton");
}

export function getPurchaseGuideStepLabels(t: PurchaseGuideTranslations) {
  return {
    getCounter(total: number) {
      return t("steps.counter", { total });
    },
    prev: t("steps.prev"),
    next: t("steps.next"),
  };
}

export function getPurchaseGuideSignup(t: PurchaseGuideTranslations) {
  return {
    title: t("signup.title"),
    description: t("signup.description"),
    highlights: [
      t("signup.highlights.freeRegistration"),
      t("signup.highlights.hotlineSupport"),
      t("signup.highlights.simpleProcedure"),
    ],
    fields: [
      {
        label: t("signup.fields.fullName.label"),
        placeholder: t("signup.fields.fullName.placeholder"),
        type: "text" as const,
      },
      {
        label: t("signup.fields.phone.label"),
        placeholder: t("signup.fields.phone.placeholder"),
        type: "tel" as const,
      },
      {
        label: t("signup.fields.email.label"),
        placeholder: t("signup.fields.email.placeholder"),
        type: "email" as const,
      },
      {
        label: t("signup.selectField.label"),
        placeholder: t("signup.selectField.placeholder"),
        type: "text" as const,
      },
      {
        label: t("signup.fields.referralCode.label"),
        placeholder: t("signup.fields.referralCode.placeholder"),
        type: "text" as const,
      },
    ] satisfies PurchaseGuideField[],
    cta: t("signup.cta"),
    submitting: t("signup.submitting"),
  };
}

export function getPurchaseGuideContacts(t: PurchaseGuideTranslations): PurchaseGuideContact[] {
  return [
    {
      type: "phone",
      label: t("contacts.phone.label"),
      value: "+84 24 7308 6888",
      description: t("contacts.phone.description"),
      isEmail: false,
    },
    {
      type: "mail",
      label: t("contacts.email.label"),
      value: "ir.info@f88.vn",
      description: t("contacts.email.description"),
      isEmail: true,
    },
  ];
}

export function getPurchaseGuideRecaptchaContent(t: PurchaseGuideTranslations) {
  return {
    title: t("recaptcha.title"),
    description: t("recaptcha.description"),
    body: t("recaptcha.body"),
    policyPrefix: t("recaptcha.policyPrefix"),
    privacy: t("recaptcha.privacy"),
    and: t("recaptcha.and"),
    terms: t("recaptcha.terms"),
    policySuffix: t("recaptcha.policySuffix"),
    cancel: t("recaptcha.cancel"),
    confirm: t("recaptcha.confirm"),
    confirming: t("recaptcha.confirming"),
  };
}

export function getPurchaseGuideSuccessContent(t: PurchaseGuideTranslations) {
  return {
    modalTitle: t("success.modalTitle"),
    title: t("success.title"),
    description: t("success.description"),
    redirect: t("success.redirect"),
    redirectHint: t("success.redirectHint"),
  };
}

export function getPurchaseGuideValidationMessages(t: PurchaseGuideTranslations) {
  return {
    fullName: {
      required: t("validation.fullName.required"),
      min: t("validation.fullName.min"),
      regex: t("validation.fullName.regex"),
    },
    phone: {
      required: t("validation.phone.required"),
      invalid: t("validation.phone.invalid"),
    },
    email: {
      required: t("validation.email.required"),
      invalid: t("validation.email.invalid"),
    },
    shareQuantity: {
      required: t("validation.shareQuantity.required"),
      invalid: t("validation.shareQuantity.invalid"),
      max: t("validation.shareQuantity.max"),
      step: t("validation.shareQuantity.step"),
    },
  };
}
