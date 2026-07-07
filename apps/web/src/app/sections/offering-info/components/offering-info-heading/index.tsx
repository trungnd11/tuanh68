import clsx from "clsx";
import AppPageTitle from "@/shared/ui/app-page-title";

export default function OfferingInfoHeading() {
  return (
    <div className={clsx("text-center")}>
      <div className={clsx("mx-auto flex max-w-200 flex-col justify-center gap-4")}>
        <AppPageTitle>Thông tin chào bán</AppPageTitle>

        <p className={clsx("text-app-neutral-600")}>Thông tin chi tiết về đợt chào bán cổ phiếu F88</p>
      </div>
    </div>
  );
}
