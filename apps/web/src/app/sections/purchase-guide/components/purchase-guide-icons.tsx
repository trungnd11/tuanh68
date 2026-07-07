export function StepBadgeIcon({ value }: { value: string }) {
  return (
    <div className="flex size-15 items-center justify-center rounded-full bg-app-primary-500/10">
      <div className="flex size-14.5 items-center justify-center rounded-full bg-app-primary-500/20">
        <div className="flex size-14 items-center justify-center rounded-full bg-app-primary-500 text-heading-sm-bold text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

export function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 text-[#00D95F]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.16" />
      <path
        d="M8 12.25L10.75 15L16 9.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-4 text-app-neutral-400"
      aria-hidden="true"
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-11 text-app-primary-550"
      aria-hidden="true"
    >
      <path
        d="M7.5 4.5H5.7C5.037 4.5 4.5 5.037 4.5 5.7c0 7.069 5.731 12.8 12.8 12.8.663 0 1.2-.537 1.2-1.2v-1.8a1.2 1.2 0 0 0-.87-1.154l-3.004-.819a1.2 1.2 0 0 0-1.168.312l-.659.678a9.835 9.835 0 0 1-4.316-4.316l.678-.659a1.2 1.2 0 0 0 .312-1.168L8.654 5.37A1.2 1.2 0 0 0 7.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-11 text-app-primary-550"
      aria-hidden="true"
    >
      <path
        d="M4.5 7.5A1.5 1.5 0 0 1 6 6h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 18 18H6a1.5 1.5 0 0 1-1.5-1.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.25 7.125L12 12l6.75-4.875"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
