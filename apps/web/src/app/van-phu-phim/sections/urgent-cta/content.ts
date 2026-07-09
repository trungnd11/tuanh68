export const urgentCtaContent = {
  badge: "ĐẶT HÀNG NGAY",
  titleLines: ["NHẬN BÁO GIÁ", "TRONG 30 PHÚT!"],
  description: [
    "Gửi yêu cầu ngay để nhận báo giá ưu đãi nhất, tư vấn",
    "lựa chọn loại ván phù hợp và ưu tiên giao hàng cho",
    "đơn hàng đầu tiên.",
  ],
  buttons: {
    primary: { label: "ĐẶT MUA NGAY", href: "#" },
    secondary: { label: "NHẬN BÁO GIÁ", href: "#" },
  },
  form: {
    title: "YÊU CẦU BÁO GIÁ",
    nameLabel: "Họ & Tên",
    namePlaceholder: "Nguyễn Văn A",
    phoneLabel: "Số điện thoại",
    phonePlaceholder: "0983 570 760",
    productLabel: "Loại sản phẩm",
    productPlaceholder: "-- Chọn loại ván --",
    quantityLabel: "Số lượng ước tính",
    quantityPlaceholder: "Vd: 500 tấm / 50m³...",
    submitLabel: "GỬI YÊU CẦU BÁO GIÁ",
  },
  products: [
    { id: "12mm", label: "Ván Phủ Phim 12mm — Tiêu Chuẩn" },
    { id: "15mm", label: "Ván Phủ Phim 15mm — Phổ Biến" },
    { id: "18mm", label: "Ván Phủ Phim 18mm — Cao Cấp" },
    { id: "21mm", label: "Ván Phủ Phim 21mm — Siêu Dày" },
    { id: "melamine", label: "Ván Melamine 15mm" },
    { id: "birch", label: "Full Birch 18mm" },
  ],
  contactInfo: [
    { icon: "phone", label: "HOTLINE", value: "0983 570 760 — 096 646 7895" },
    { icon: "mail", label: "EMAIL", value: "admin@vanphuphim.vn.com" },
    { icon: "map", label: "ĐỊA CHỈ NHÀ MÁY", value: "KCN Hồ Điền, Đan Phượng, Hà Nội" },
  ],
  backgroundTexture: "/assets/products/cta/wood-texture.jpg",
} as const;
