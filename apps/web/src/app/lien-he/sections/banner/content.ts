export const bannerContent = {
  id: "lien-he",
  breadcrumb: {
    home: "Trang Chủ",
    current: "Liên Hệ",
    homeHref: "/",
  },
  badge: "LIÊN HỆ VỚI CHÚNG TÔI",
  title: ["KẾT NỐI NGAY", "CÙNG TU ANH 68"],
  description: [
    "Đội ngũ tư vấn của chúng tôi sẵn sàng hỗ trợ bạn 6 ngày trong tuần —",
    "báo giá nhanh, giao hàng tận nơi toàn quốc.",
  ],
  backgroundImage: "/assets/banner/hero-section.png",
  buttons: {
    primary: { label: "GỌI NGAY", href: "tel:0983570760" },
    secondary: { label: "GỬI TIN NHẮN", href: "#lien-he-form" },
  },
  stats: [
    { icon: "clock", label: "Thứ 2 – Thứ 7", value: "7:30 – 17:30" },
    { icon: "location", label: "KCN Hồ Điền, Đan Phượng", value: "Hà Nội, Việt Nam" },
    { icon: "truck", label: "Giao Hàng Toàn Quốc", value: "63 tỉnh thành" },
    { icon: "chat", label: "Tư Vấn Miễn Phí", value: "Báo giá trong 30 phút" },
  ],
} as const;
