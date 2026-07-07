export function normalizeShareQuantityInput(rawValue: string) {
  return rawValue.replace(/\D/g, "");
}

export function formatShareQuantityDisplay(value: string) {
  if (!value) {
    return "";
  }

  return new Intl.NumberFormat("en-US").format(Number(value));
}
