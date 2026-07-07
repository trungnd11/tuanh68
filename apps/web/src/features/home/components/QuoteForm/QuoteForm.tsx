'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  AppField,
  AppInput,
  AppSelect,
  AppTextarea,
  AppButton,
  AppHeading,
  AppText,
} from '@tuanh68/ui';
import { products } from '../../mock/products';

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    quantity: '',
    location: '',
    note: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-[18px]">
      <AppHeading level="title" title="lg" as="h3">Nhận báo giá ngay</AppHeading>
      <AppText variant="body" size="sm" color="muted">
        Điền thông tin, chúng tôi sẽ liên hệ trong vòng 30 phút
      </AppText>
      <AppField label="Họ và tên" required>
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppInput
            id={id}
            {...rest}
            className="h-12"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
            placeholder="Nhập họ tên"
          />
        )}
      </AppField>
      <AppField label="Số điện thoại" required>
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppInput
            id={id}
            {...rest}
            className="h-12"
            value={formData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        )}
      </AppField>
      <AppField label="Sản phẩm quan tâm">
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppSelect
            id={id}
            {...rest}
            className="h-12"
            value={formData.product}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('product', e.target.value)}
            placeholder="-- Chọn sản phẩm --"
          >
            {products.map((p) => (
              <option key={p.id} value={p.slug}>{p.name}</option>
            ))}
          </AppSelect>
        )}
      </AppField>
      <AppField label="Số lượng (tấm)">
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppInput
            id={id}
            {...rest}
            className="h-12"
            value={formData.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('quantity', e.target.value)}
            placeholder="Số lượng dự kiến"
          />
        )}
      </AppField>
      <AppField label="Địa điểm giao hàng">
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppInput
            id={id}
            {...rest}
            className="h-12"
            value={formData.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
            placeholder="Nhập địa chỉ"
          />
        )}
      </AppField>
      <AppField label="Ghi chú">
        {({ id, ...rest }: { id: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }): ReactElement => (
          <AppTextarea
            id={id}
            {...rest}
            value={formData.note}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('note', e.target.value)}
            placeholder="Yêu cầu thêm (nếu có)"
          />
        )}
      </AppField>
      <AppButton type="submit" fullWidth className="h-[52px] text-[15px] font-bold">
        Gửi yêu cầu báo giá
      </AppButton>
    </form>
  );
}
