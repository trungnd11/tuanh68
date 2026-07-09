import { appSectionIds } from "@/shared/config/app";

export const bannerContent = {
  id: appSectionIds.products,
  breadcrumb: {
    home: "Trang Chủ",
    current: "Ván Phủ Phim",
    homeHref: "/",
  },
  badge: "SẢN PHẨM CHỦ LỰC",
  title: ["VÁN ÉP", "PHỦ PHIM"],
  description: [
    "Sản phẩm ván ép phủ phim phenolic chất lượng cao — chịu nước",
    "tuyệt đối, tái sử dụng 8–15 lần, bề mặt nhẵn bóng hoàn hảo cho mọi",
    "công trình xây dựng.",
  ],
  backgroundImage: "/assets/products/hero/hero-background.png",
  tags: [
    { icon: "/assets/products/hero/icon-waterproof.png", label: "Chống thấm WBP" },
    { icon: "/assets/products/hero/icon-reuse.png", label: "Tái sử dụng 8–15 lần" },
    { icon: "/assets/products/hero/icon-iso.png", label: "ISO 9001:2015" },
    { icon: "/assets/products/hero/icon-eco.png", label: "Thân thiện môi trường" },
  ],
  buttons: {
    primary: { label: "XEM SẢN PHẨM", href: "#products-catalog" },
    secondary: { label: "NHẬN BÁO GIÁ", href: "#" },
  },
  statCards: [
    {
      icon: "/assets/products/hero/icon-thickness.png",
      value: "12–21",
      label: "MM ĐỘ DÀY",
      iconBg: "rgba(41,115,178,0.3)",
    },
    {
      icon: "/assets/products/hero/icon-cycle.png",
      value: "15x",
      label: "LẦN TÁI SỬ DỤNG",
      iconBg: "rgba(72,166,167,0.3)",
    },
    {
      icon: "/assets/products/hero/icon-size.png",
      value: "1220",
      label: "×2440MM KÍCH THƯỚC",
      iconBg: "rgba(122,156,89,0.3)",
    },
    {
      icon: "/assets/products/hero/icon-density.png",
      value: "600+",
      label: "KG/M³ MẬT ĐỘ",
      iconBg: "rgba(41,115,178,0.3)",
    },
  ],
  scrollDown: "CUỘN XUỐNG",
} as const;
