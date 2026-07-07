interface GrecaptchaExecuteOptions {
  action: string;
}

interface Grecaptcha {
  execute(siteKey: string, options: GrecaptchaExecuteOptions): Promise<string>;
  ready(callback: () => void): void;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export {};
