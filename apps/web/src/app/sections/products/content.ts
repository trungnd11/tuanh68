import { appSectionIds } from "@/shared/config/app";

export const productsContent = {
  id: appSectionIds.products,
  title: "SẢN PHẨM & DỊCH VỤ",
  featured: {
    image: "/assets/products/film-faced-plywood.png",
    badge: "SẢN PHẨM CHỦ LỰC",
    title: "Ván Ép Phủ Phim",
    description: "Tái sử dụng nhiều lần, bề mặt nhẵn bóng, chịu nước tốt.",
    cta: "Tìm hiểu thêm",
    href: "#",
  },
  cards: [
    {
      image: "/assets/products/factory-10000m2.png",
      title: "Nhà Máy 10.000m²",
      description: "Máy móc hiện đại, tối ưu chi phí.",
    },
    {
      image: "/assets/products/interior-plywood.png",
      title: "Ván Ép Nội Thất",
      description: "Nâng tầm không gian sống.",
    },
    {
      image: "/assets/products/construction-scaffolding.png",
      title: "Giàn Giáo Xây Dựng",
      description: "Giáo nêm, giáo ringlock, giáo bao che.",
    },
  ],
  process: {
    icon: "/assets/products/clipboard-check.png",
    title: "Quy Trình Minh Bạch",
    description: ["Đối tác trực tiếp giám sát toàn bộ", "quy trình sản xuất."],
  },
} as const;
