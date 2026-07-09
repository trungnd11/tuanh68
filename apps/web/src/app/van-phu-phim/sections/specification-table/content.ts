export const specTableContent = {
  badge: "DỮ LIỆU KỸ THUẬT",
  titleParts: ["THÔNG SỐ ", "KỸ THUẬT"],
  description: ["Toàn bộ thông số kỹ thuật được kiểm định và công bố minh bạch theo tiêu chuẩn quốc", "tế."],
  tableHeader: {
    title: "BẢNG THÔNG SỐ VÁN PHỦ PHIM — TU ANH 68",
  },
  columns: [
    { key: "param", label: "THÔNG SỐ", width: "w-[241px]" },
    { key: "col1", label: "12MM TIÊU CHUẨN" },
    { key: "col2", label: "15MM TIÊU CHUẨN" },
    { key: "col3", label: "18MM CAO CẤP", highlighted: true },
    { key: "col4", label: "21MM SIÊU DÀY" },
    { key: "col5", label: "18MM FULL BIRCH" },
  ],
  rows: [
    {
      iconKey: "ruler",
      label: "Độ dày",
      values: { col1: "12mm", col2: "15mm", col3: "18mm", col4: "21mm", col5: "18mm" },
    },
    {
      iconKey: "size",
      label: "Kích thước",
      values: {
        col1: "1220×2440mm",
        col2: "1220×2440mm",
        col3: "1220×2440mm",
        col4: "1220×2440mm",
        col5: "1220×2440mm",
      },
    },
    {
      iconKey: "wood",
      label: "Ruột ván (Core)",
      values: {
        col1: "Gỗ Bạch Dương",
        col2: "Gỗ Keo",
        col3: "Gỗ Bạch Dương",
        col4: "Gỗ Bạch Dương",
        col5: "Full Birch 100%",
      },
    },
    {
      iconKey: "glue",
      label: "Loại keo",
      values: {
        col1: "WBP Phenolic",
        col2: "WBP Phenolic",
        col3: "WBP Phenolic",
        col4: "WBP Phenolic",
        col5: "WBP Phenolic",
      },
    },
    {
      iconKey: "film",
      label: "Loại phim",
      values: {
        col1: "Dynea Đen",
        col2: "Dynea Nâu",
        col3: "Dynea Đen 120g",
        col4: "Dynea Đen",
        col5: "Dynea Đen 120g",
      },
    },
    {
      iconKey: "weight",
      label: "Định lượng phim",
      values: { col1: "80g/m²", col2: "100g/m²", col3: "120g/m²", col4: "120g/m²", col5: "120g/m²" },
    },
    {
      iconKey: "layers",
      label: "Số lớp ván",
      values: { col1: "7 lớp", col2: "9 lớp", col3: "11 lớp", col4: "13 lớp", col5: "11 lớp" },
    },
    {
      iconKey: "density",
      label: "Mật độ",
      values: {
        col1: "580–600 kg/m³",
        col2: "600–620 kg/m³",
        col3: "620–650 kg/m³",
        col4: "640–660 kg/m³",
        col5: "650–680 kg/m³",
      },
    },
    {
      iconKey: "cycle",
      label: "Số lần luân chuyển",
      values: { col1: "8–12 lần", col2: "10–12 lần", col3: "12–15 lần", col4: "12–15 lần", col5: "15 lần" },
      isBadge: true,
    },
    {
      iconKey: "temperature",
      label: "Chịu nhiệt độ",
      values: {
        col1: "-40°C ~ +100°C",
        col2: "-40°C ~ +100°C",
        col3: "-40°C ~ +120°C",
        col4: "-40°C ~ +120°C",
        col5: "-40°C ~ +120°C",
      },
    },
    {
      iconKey: "certificate",
      label: "Tiêu chuẩn",
      values: {
        col1: "ISO 9001, E2",
        col2: "ISO 9001, E1",
        col3: "ISO 9001, E1",
        col4: "ISO 9001, E1",
        col5: "CARB P2, E0",
      },
    },
  ],
  footer: {
    text: "Số liệu trên là giá trị danh nghĩa; dung sai sản xuất ±5%. Thông số thực tế có thể điều chỉnh theo yêu cầu đơn hàng.",
    downloadLabel: "Tải bảng thông số (PDF)",
  },
} as const;
