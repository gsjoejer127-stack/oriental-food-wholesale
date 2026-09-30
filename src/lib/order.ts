import { CartItem, DeliveryZone, Language, Product } from '../types';

/** Company WhatsApp line used for every order / enquiry on the site. */
export const WHATSAPP_NUMBER = '60108822608';

/** Cold-chain delivery rules, shared by the cart drawer, checkout and quick order. */
export const DELIVERY_RULES: Record<DeliveryZone, { freeThreshold: number; standardFee: number }> = {
  klang_valley: { freeThreshold: 500, standardFee: 40 },
  outstation: { freeThreshold: 800, standardFee: 40 },
  self_pickup: { freeThreshold: 0, standardFee: 0 },
};

export const getDeliveryFee = (zone: DeliveryZone, subtotal: number): number => {
  const { freeThreshold, standardFee } = DELIVERY_RULES[zone];
  if (zone === 'self_pickup' || subtotal >= freeThreshold) return 0;
  return standardFee;
};

export const zoneLabel = (zone: DeliveryZone, lang: Language): string => {
  if (zone === 'klang_valley') {
    return lang === 'zh' ? '巴生谷 Klang Valley' : lang === 'ms' ? 'Lembah Klang' : 'Klang Valley';
  }
  if (zone === 'outstation') {
    return lang === 'zh' ? '外坡 Outstation' : lang === 'ms' ? 'Luar Kawasan' : 'Outstation';
  }
  return lang === 'zh' ? '自取 Self Pickup' : lang === 'ms' ? 'Ambil Sendiri' : 'Self Pickup';
};

export const productName = (product: Product, lang: Language): string => {
  if (lang === 'zh') return product.nameZh;
  if (lang === 'ms') return product.nameMs || product.nameEn;
  return product.nameEn;
};

export const categoryName = (
  cat: { nameZh: string; nameEn: string; nameMs?: string },
  lang: Language
): string => {
  if (lang === 'zh') return cat.nameZh;
  if (lang === 'ms') return cat.nameMs || cat.nameEn;
  return cat.nameEn;
};

export const packLabel = (item: CartItem): string =>
  item.packOption === 'carton' ? item.product.pricing.cartonLabel : item.product.pricing.unitLabel;

export interface QuickOrderContact {
  name: string;
  phone: string;
  address?: string;
  notes?: string;
}

/**
 * Builds the plain-text order message for the one-tap WhatsApp quick order.
 * Kept deliberately short so the sales team can read it on a phone screen.
 */
export const buildQuickOrderText = (
  items: CartItem[],
  zone: DeliveryZone,
  contact: QuickOrderContact,
  lang: Language
): string => {
  const subtotal = items.reduce((acc, i) => acc + i.pricePerUnit * i.quantity, 0);
  const deliveryFee = getDeliveryFee(zone, subtotal);

  const t =
    lang === 'zh'
      ? {
          header: '*东升食品 · 快速下单*',
          items: '*订购清单*',
          zone: '配送方式',
          subtotal: '小计',
          fee: '冷链运费',
          total: '预估总额',
          name: '联系人 / 店名',
          phone: '联系电话',
          address: '送货地址',
          notes: '备注',
          footer: '请帮我确认现货与送货时间，谢谢！',
        }
      : lang === 'ms'
      ? {
          header: '*Oriental Food · Pesanan Pantas*',
          items: '*Senarai Pesanan*',
          zone: 'Mod Penghantaran',
          subtotal: 'Jumlah Kecil',
          fee: 'Caj Penghantaran',
          total: 'Anggaran Jumlah',
          name: 'Nama / Nama Kedai',
          phone: 'No. Telefon',
          address: 'Alamat Penghantaran',
          notes: 'Nota',
          footer: 'Sila sahkan stok dan masa penghantaran. Terima kasih!',
        }
      : {
          header: '*Oriental Food · Quick Order*',
          items: '*Order List*',
          zone: 'Delivery Mode',
          subtotal: 'Subtotal',
          fee: 'Delivery Fee',
          total: 'Estimated Total',
          name: 'Contact / Outlet',
          phone: 'Phone',
          address: 'Delivery Address',
          notes: 'Notes',
          footer: 'Please confirm stock availability and delivery schedule. Thank you!',
        };

  const lines: string[] = [t.header, '', t.items];

  items.forEach((i) => {
    lines.push(
      `• ${i.product.code} ${productName(i.product, lang)} (${packLabel(i)}) x${i.quantity} = RM ${(
        i.pricePerUnit * i.quantity
      ).toFixed(2)}`
    );
  });

  lines.push('');
  lines.push(`${t.subtotal}: RM ${subtotal.toFixed(2)}`);
  lines.push(`${t.fee}: RM ${deliveryFee.toFixed(2)}`);
  lines.push(`${t.total}: RM ${(subtotal + deliveryFee).toFixed(2)}`);
  lines.push(`${t.zone}: ${zoneLabel(zone, lang)}`);
  lines.push('');
  lines.push(`${t.name}: ${contact.name}`);
  lines.push(`${t.phone}: ${contact.phone}`);
  if (contact.address?.trim()) lines.push(`${t.address}: ${contact.address.trim()}`);
  if (contact.notes?.trim()) lines.push(`${t.notes}: ${contact.notes.trim()}`);
  lines.push('');
  lines.push(t.footer);

  return lines.join('\n');
};

export const whatsappLink = (text: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
