export function getFieldError(errors: readonly unknown[]) {
  for (const error of errors) {
    if (typeof error === "string" && error) {
      return error;
    }

    if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return undefined;
}

export function shouldShowFieldError(hasError: boolean, isTouched: boolean, submissionAttempts: number) {
  return hasError && (isTouched || submissionAttempts > 0);
}
