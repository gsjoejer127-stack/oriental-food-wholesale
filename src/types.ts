export type Language = 'zh' | 'en' | 'ms';

export type PackType = 'pkt' | 'ctn' | 'box' | 'btl';

export interface ProductPricing {
  unitLabel: string; // e.g. "200g*box" or "1kg*pkt" or "400g*20pcs*pkt"
  unitPrice: number; // Price in RM
  cartonLabel: string; // e.g. "200g*30pkt*ctn" or "Inquire"
  cartonPrice: number | null; // Price in RM, null if "Inquire"
  cartonRatio?: number; // e.g. 30 (30 pkts in 1 ctn)
}

export type CertType = 'HALAL' | 'IMPORT' | 'REGULAR';

export interface Product {
  id: number;
  code: string;
  nameZh: string;
  nameEn: string;
  nameMs?: string;
  categoryId: string;
  categoryZh: string;
  categoryEn: string;
  categoryMs?: string;
  cert: CertType;
  pricing: ProductPricing;
  image: string;
  descriptionZh?: string;
  descriptionEn?: string;
  descriptionMs?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

export interface Category {
  id: string;
  codeZh: string;
  nameZh: string;
  nameEn: string;
  nameMs?: string;
  icon: string;
  noRange: string;
}

export interface CartItem {
  product: Product;
  packOption: 'unit' | 'carton'; // whether ordering by unit (pkt/box/btl) or full carton/case
  quantity: number;
  pricePerUnit: number; // computed price based on packOption
}

export type DeliveryZone = 'klang_valley' | 'outstation' | 'self_pickup';

export type PaymentMethod = 'fpx' | 'tng' | 'card' | 'bank_transfer';

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  address: string;
  city: string;
  postcode: string;
  state: string;
  deliveryZone: DeliveryZone;
  deliveryDate: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: CheckoutFormData;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentStatus: 'paid' | 'pending';
}
