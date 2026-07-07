type AutofillFieldMeta = {
  isBlurred?: boolean;
  isDirty?: boolean;
  isTouched?: boolean;
  [key: string]: unknown;
};

type AutofillFormValues = {
  FullName: string;
  Phone: string;
  Email: string;
  ShareQuantity: string;
};

type AutofillFieldName = keyof AutofillFormValues;

type AutofillSyncFormApi = {
  setFieldValue: (fieldName: string, nextValue: string, options: { dontValidate: boolean }) => void;
  setFieldMeta: (fieldName: string, updater: (previousMeta: AutofillFieldMeta) => AutofillFieldMeta) => void;
  validateField: (fieldName: string, cause: "change" | "blur") => Promise<unknown>;
};

export async function syncAutofilledFieldValue<TFieldName extends AutofillFieldName>(
  form: unknown,
  fieldName: TFieldName,
  nextValue: AutofillFormValues[TFieldName]
) {
  const formApi = form as AutofillSyncFormApi;

  formApi.setFieldValue(fieldName, nextValue, { dontValidate: true });
  formApi.setFieldMeta(fieldName, (previousMeta) => ({
    ...previousMeta,
    isBlurred: true,
    isDirty: true,
    isTouched: true,
  }));

  await Promise.all([formApi.validateField(fieldName, "change"), formApi.validateField(fieldName, "blur")]);
}
