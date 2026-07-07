import Script from "next/script";

interface RecaptchaProps {
  siteKey?: string;
  hideBadge?: boolean;
}

export default function Recaptcha({ siteKey, hideBadge = true }: RecaptchaProps) {
  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        id="google-recaptcha-v3"
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />

      {hideBadge && (
        <style>{`
          .grecaptcha-badge {
            visibility: hidden;
          }
        `}</style>
      )}
    </>
  );
}
