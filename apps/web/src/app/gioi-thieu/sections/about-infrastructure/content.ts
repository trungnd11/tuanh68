export const aboutInfrastructureContent = {
  id: "co-so-ha-tang",
  badge: "CƠ SỞ HẠ TẦNG",
  title: ["NĂNG LỰC SẢN XUẤT"],
  description:
    "Tu Anh 68 sở hữu cơ sở hạ tầng sản xuất ván ép hiện đại bậc nhất miền Bắc — từ nhà máy quy mô lớn, dây chuyền tự động hóa cao đến hệ thống kho bãi và logistics chuyên nghiệp. Mỗi sản phẩm đều được kiểm soát chất lượng nghiêm ngặt từ khâu nguyên liệu đến khi xuất xưởng.",
  cards: [
    {
      image: "/assets/about/infrastructure-factory.jpg",
      iconBg: "#2973b2",
      number: "01",
      label: "NHÀ MÁY",
      title: "Nhà Máy 10.000m²",
      description:
        "Nhà máy sản xuất ván ép phủ phim với diện tích lên đến 10.000 mét vuông, đáp ứng mọi đơn hàng số lượng lớn.",
      stats: [
        { value: "10.000", unit: "m²", label: "Diện tích" },
        { value: "200", unit: "+", label: "Công nhân" },
      ],
    },
    {
      image: "/assets/about/infrastructure-production-line.jpg",
      iconBg: "#48a6a7",
      number: "02",
      label: "DÂY CHUYỀN",
      title: "Dây Chuyền Tự Động",
      description:
        "Dây chuyền sản xuất hiện đại với máy móc tự động hóa cao, đảm bảo năng suất và chất lượng ổn định cho từng sản phẩm.",
      stats: [
        { value: "500", unit: "+", label: "m³/tháng" },
        { value: "ISO", unit: "", label: "Tiêu chuẩn" },
      ],
    },
    {
      image: "/assets/about/infrastructure-warehouse.jpg",
      iconBg: "#7a9c59",
      number: "03",
      label: "KHO BÃI",
      title: "Kho Bãi Lớn",
      description:
        "Hệ thống kho bãi rộng lớn với quy trình quản lý hàng tồn kho chuyên nghiệp, đảm bảo giao hàng nhanh chóng tới mọi miền.",
      stats: [
        { value: "3000", unit: "+", label: "m³ tồn kho" },
        { value: "63", unit: "", label: "Tỉnh giao hàng" },
      ],
    },
  ],
} as const;
