import clsx from "clsx";
import { twc } from "react-twc";
import PlayIcon from "@/assets/icons/play.svg";
import AppButton from "@/shared/ui/app-button";
import AppPageTitle from "@/shared/ui/app-page-title";

const ParagraphStyle = twc.p`text-main-app-text-body`;

const PARAGRAPHS = [
  "F88 là một trong những công ty tài chính hàng đầu tại Việt Nam, chuyên cung cấp các dịch vụ tài chính toàn diện. Với hơn 10 năm kinh nghiệm, F88 đã xây dựng được mạng lưới chi nhánh rộng khắp cả nước.",
  "F88 cam kết mang đến những giải pháp tài chính tiện lợi, nhanh chóng và minh bạch cho khách hàng. Công ty không ngừng đổi mới và áp dụng công nghệ vào quy trình vận hành để nâng cao trải nghiệm khách hàng.",
];

export default function TextDescription() {
  return (
    <div className={clsx("order-2 flex flex-col gap-6 xl:order-1 xl:gap-8")}>
      <AppPageTitle className={clsx("hidden text-start xl:block")}>Tổng quan về F88</AppPageTitle>
      <div className={clsx("flex flex-col gap-5")}>
        {PARAGRAPHS.map((paragraph, index) => (
          <ParagraphStyle key={index}>{paragraph}</ParagraphStyle>
        ))}
      </div>
      <AppButton
        borderRadiusProps={{
          classNameContainer: clsx("xl:flex-1 drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"),
        }}
        className={clsx(
          "bg-main-app-red flex h-13 w-full items-center justify-center gap-3 text-white xl:min-w-55 xl:w-max",
          "font-bold"
        )}
      >
        <PlayIcon />
        <span>Xem Roadshow</span>
      </AppButton>
    </div>
  );
}
