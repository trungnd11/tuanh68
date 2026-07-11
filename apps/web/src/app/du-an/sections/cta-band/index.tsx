import clsx from "clsx";
import CtaBadge from "./cta-badge";
import CtaHeading from "./cta-heading";
import CtaActions from "./cta-actions";

export default function CtaBandSection() {
  return (
    <div
      className={clsx(
        "flex flex-col items-start border-b border-gray-100 bg-white px-4 py-6",
        "lg:px-[272px] lg:pb-[65px] lg:pt-16"
      )}
    >
      <div className={clsx("mx-auto flex w-full max-w-[896px] flex-col items-center gap-3 lg:gap-5")}>
        <CtaBadge />
        <CtaHeading />
        <CtaActions />
      </div>
    </div>
  );
}
