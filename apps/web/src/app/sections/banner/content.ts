import { appSectionIds } from "@/shared/config/app";

export const bannerContent = {
  id: appSectionIds.home,
  title: ["NHÀ MÁY SẢN XUẤT", "VÁN PHỦ PHIM"],
  subtitle: "Tu Anh 68 Manufacturing CO.,LTD",
  primaryCta: {
    label: "XEM SẢN PHẨM",
    href: `#${appSectionIds.products}`,
  },
  secondaryCta: {
    label: "LIÊN HỆ NGAY",
    href: `#${appSectionIds.contact}`,
  },
} as const;
