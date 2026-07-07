# Tuấn Anh 68 Foundation Design System

Foundation này dành cho hệ thống B2B industrial corporate dài hạn: Landing Website, Corporate Website, CMS Admin, Dashboard và Future Mobile Web. Giai đoạn này chỉ định nghĩa token, không định nghĩa component.

## 1. Color Philosophy

Bảng màu theo hướng Industrial Luxury: nền corporate tối, surface thép lạnh, primary gold/copper cao cấp. Token dùng tên semantic để component không phụ thuộc màu vật lý.

- `--color-primary-*`: điểm nhấn thương hiệu, CTA quan trọng, focus, selected state.
- `--color-background-*`: canvas cấp trang.
- `--color-surface-*`: panel, section, navigation, admin shell, dashboard region.
- `--color-border-*` và `--color-divider`: tạo cấu trúc bằng border mỏng thay vì shadow nặng.
- `--color-text-*`: phân cấp nội dung.
- `success`, `warning`, `danger`, `info`: trạng thái hệ thống, được tiết chế để hợp B2B.

Không dùng raw hex, `slate`, `yellow`, `blue`, hoặc tên màu vật lý trong component.

## 2. Typography Philosophy

Typography dùng role semantic thay vì class kích thước trực tiếp. Mỗi role có font-size, line-height, letter-spacing và font-weight.

Font đề xuất:

- Primary: Inter
- Fallback: Geist, Manrope
- Lý do: Inter trung tính, trưởng thành, đọc tốt trong dashboard/admin và hỗ trợ tiếng Việt ổn. Geist hợp UI hiện đại. Manrope có thể dùng sau nếu brand cần cảm giác editorial hơn.

Các role chính: `display-xl`, `display-lg`, `display-md`, `headline-xl`, `headline-lg`, `headline-md`, `title-lg`, `title-md`, `title-sm`, `body-lg`, `body-md`, `body-sm`, `caption`, `label`, `button`, `overline`.

## 3. Spacing Philosophy

Spacing dùng scale 2/4/8 rõ ràng, có thêm spacing lớn cho corporate page. Landing/corporate cần rộng rãi; admin/dashboard cần gọn và đều.

- Base scale: `--spacing-0` đến `--spacing-160`
- Section: `--spacing-section-sm`, `--spacing-section-md`, `--spacing-section-lg`
- Container: `--spacing-container-x`, `--spacing-container-y`
- Card padding: `--spacing-card-sm`, `--spacing-card-md`, `--spacing-card-lg`
- Form: `--spacing-form-field`, `--spacing-form-group`, `--spacing-form-section`

Không thêm spacing one-off nếu token hiện có đáp ứng được layout.

## 4. Motion Philosophy

Motion phục vụ phản hồi và định hướng, không dùng để trang trí rối mắt.

- `--duration-fast`: feedback nhỏ cho control.
- `--duration-normal`: hover, button, tab, card.
- `--duration-slow`: drawer, modal, page-level state.
- `--ease-standard`: default product motion.
- `--ease-in`, `--ease-out`, `--ease-in-out`: transition có hướng.

Luôn tôn trọng `prefers-reduced-motion`.

## 5. Glass Effect Rules

Glass là treatment đặc biệt, không phải surface mặc định.

- Dùng chung `--glass-background`, `--glass-border`, `--glass-blur`, `--glass-shadow`.
- Chỉ dùng cho header overlay, hero navigation, premium panel hoặc floating controls.
- Không lồng glass card trong glass card.
- Đảm bảo contrast đủ cao khi đặt text trên glass.

## 6. Border Rules

Border là công cụ tạo cấu trúc chính của hệ thống.

- `--border-thin`: card, section, divider thông thường.
- `--border-normal`: active control, form focus wrapper.
- `--border-strong`: selected hoặc critical state.
- `--border-glass`: chỉ dùng cho glass surface.

Ưu tiên border mỏng thay vì shadow đậm, đặc biệt trong CMS và dashboard.

## 7. Radius Rules

Website có thể dùng radius rộng để tạo cảm giác premium; admin nên chặt hơn.

- `xs` đến `md`: form field, table cell, compact control.
- `lg` đến `2xl`: card, panel, media block.
- `3xl`: marketing surface lớn, hero media.
- `full`: pill, avatar, circular controls.

Không tạo arbitrary radius trong component.

## 8. Shadow Rules

Shadow dùng để thể hiện elevation khi border chưa đủ. Không dùng shadow nặng hoặc nhiều lớp.

- `xs`, `sm`: control nhỏ, subtle overlay.
- `md`, `lg`: dropdown, sticky panel, important card.
- `xl`, `floating`: modal hoặc hero-level depth.
- `glass`: đi cùng glass treatment.

## 9. Responsive Rules

Breakpoint semantic:

- `mobile`: phone compact.
- `tablet`: tablet nhỏ và màn hình trung bình.
- `laptop`: layout app tiêu chuẩn.
- `desktop`: dashboard/corporate rộng.
- `wide`: màn hình lớn.

Container token:

- `--container-sm`
- `--container-md`
- `--container-lg`
- `--container-xl`
- `--container-2xl`

Marketing section nên dùng `--section-width`. Nội dung đọc dài dùng `--content-width` hoặc `--prose-width`.

## 10. Accessibility

Accessibility là một phần của token contract.

- Focus dùng `--color-focus-ring`.
- Text selection dùng `--color-selection`.
- Disabled state dùng token riêng, không chỉ giảm opacity.
- Text phải đạt contrast phù hợp với surface.
- Không truyền đạt trạng thái chỉ bằng màu.
- Motion phải tuân thủ `prefers-reduced-motion`.

## 11. Naming Convention

Tên token mô tả vai trò, không mô tả màu vật lý.

Đúng:

- `--color-primary-500`
- `--color-background-primary`
- `--color-surface-glass`
- `--color-text-secondary`
- `--spacing-section-lg`
- `--radius-2xl`
- `--shadow-floating`
- `--duration-normal`
- `--z-modal`

Sai:

- `--yellow`
- `--blue`
- `--black2`
- `--card-color`
- raw Tailwind palette class trong component

## 12. Best Practices

- Component chỉ consume semantic token.
- Raw hex chỉ được nằm trong token files.
- `globals.css` phải nhỏ, chỉ import theme và đặt base behavior.
- Thêm foundation mới vào `apps/web/src/styles/tokens`.
- `theme.css` là integration layer cho TailwindCSS v4 `@theme`.
- Không để visual style của landing page lẫn vào primitive của CMS/dashboard.
- Trước khi thêm token mới, kiểm tra token hiện có có tái sử dụng được không.
- Component layer sẽ được xây ở bước tiếp theo sau khi foundation ổn định.
