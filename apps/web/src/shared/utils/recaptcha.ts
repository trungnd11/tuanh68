const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const purchaseGuideRecaptchaAction = "share_registration_create";

function getRecaptchaClient() {
  if (typeof window === "undefined") {
    throw new Error("reCAPTCHA can only run in the browser");
  }

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA script is not loaded");
  }

  return window.grecaptcha;
}

async function waitForRecaptchaReady() {
  const recaptcha = getRecaptchaClient();

  await new Promise<void>((resolve) => {
    recaptcha.ready(() => {
      resolve();
    });
  });

  return recaptcha;
}

export async function executeRecaptcha(action: string) {
  if (!recaptchaSiteKey) {
    throw new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured");
  }

  const recaptcha = await waitForRecaptchaReady();
  const token = await recaptcha.execute(recaptchaSiteKey, { action });

  if (!token) {
    throw new Error("reCAPTCHA returned an empty token");
  }

  return token;
}
