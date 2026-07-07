import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Ván ép phủ phim 12mm',
    slug: 'van-ep-phu-phim-12mm',
    description: 'Ván ép phủ phim chất lượng cao dành cho coffa bê tông, độ bền vượt trội, chịu lực tốt.',
    specs: ['Độ dày: 12mm', 'Kích thước: 1220x2440mm', 'Số lớp: 9 lớp', 'Phủ phim: 2 mặt'],
    image: '/images/products/product-12mm.jpg',
    category: 'Ván ép phủ phim',
  },
  {
    id: '2',
    name: 'Ván ép phủ phim 15mm',
    slug: 'van-ep-phu-phim-15mm',
    description: 'Ván ép phủ phim cao cấp cho các công trình yêu cầu chịu lực cao hơn.',
    specs: ['Độ dày: 15mm', 'Kích thước: 1220x2440mm', 'Số lớp: 11 lớp', 'Phủ phim: 2 mặt'],
    image: '/images/products/product-15mm.jpg',
    category: 'Ván ép phủ phim',
  },
  {
    id: '3',
    name: 'Ván ép phủ phim 18mm',
    slug: 'van-ep-phu-phim-18mm',
    description: 'Sản phẩm chủ lực dành cho các dự án lớn, đáp ứng tiêu chuẩn kỹ thuật khắt khe nhất.',
    specs: ['Độ dày: 18mm', 'Kích thước: 1220x2440mm', 'Số lớp: 13 lớp', 'Phủ phim: 2 mặt'],
    image: '/images/products/product-18mm.jpg',
    category: 'Ván ép phủ phim',
  },
  {
    id: '4',
    name: 'Coffa đỏ Tuấn Anh 68',
    slug: 'coffa-do-tuan-anh-68',
    description: 'Dòng sản phẩm cao cấp nhất, sử dụng keo chịu nước hoàn toàn, phù hợp với mọi điều kiện thời tiết.',
    specs: ['Độ dày: 18mm', 'Kích thước: 1220x2440mm', 'Keo: MR/WBP', 'Phủ phim đỏ: 2 mặt'],
    image: '/images/products/product-coffa-do.jpg',
    category: 'Coffa đỏ',
  },
];
